import React, { useContext, useEffect } from "react";
import { Chart } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController,
  Title,
} from "chart.js";
import {
  Box,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import WeekPicker from "../../components/molecules/WeekPicker";
import MonthPicker from "../../components/molecules/MonthPicker";
import { UserContext } from "../../contexts/UserProvider";
import { findEmotionByDateRange } from "../../apis/emotions";

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController,
  Title,
);

const labels = [
  "5/1",
  "5/2",
  "5/4",
  "5/7",
  "5/8",
  "5/10",
  "5/14",
  "5/15",
  "5/24",
  "5/25",
  "5/31",
  "6/1",
  "6/2",
  "6/4",
  "6/8",
  "6/10",
  "6/15",
  "6/14",
  "6/15",
  "6/31",
  "7/5",
  "7/6",
  "7/7",
  "7/15",
  "7/18",
  "7/19",
  "7/24",
  "7/25",
  "7/31",
  "8/1",
  "8/2",
  "8/4",
  "8/7",
  "8/8",
  "8/10",
  "8/12", // 총 31개 반복 data
];

const options = {
  plugins: {
    title: {
      display: true,
      text: "주간 감정 그래프",
    },
  },
  responsive: true,
  interaction: {
    mode: "index" as const,
    intersect: false,
  },
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
};

const data = {
  labels,
  datasets: [
    {
      type: "line" as const,
      label: "total score",
      borderColor: "rgb(75, 192, 192)",
      borderWidth: 2,
      fill: false,
      // data: [10, 2, -9, 6, 3, 7, 7, 17, -15, 31], // 원래 data
      data: [
        10, 2, -9, 6, 3, 7, 7, 17, -15, 31, 10, 2, -9, 6, 3, 7, 7, 17, -15, 31,
        10, 2, -9, 6, 3, 7, 7, 17, -15, 31, 31, 7, 17, -15, 31, 31,
      ], // monthly data
    },
    {
      type: "bar" as const,
      label: "negative word",
      backgroundColor: "rgb(53, 162, 235)",
      // data: [0, -3, -15, -10, -6, -2, -11, -2, -30, -5], // 원래 data
      data: [
        0, -3, -15, -10, -6, -2, -11, -2, -30, -5, 0, -3, -15, -10, -6, -2, -11,
        -2, -30, -5, 0, -3, -15, -10, -6, -2, -11, -2, -30, -5, -5, -11, -2,
        -30, -5, -5,
      ], // monthly data
      borderColor: "white",
      borderWidth: 2,
      stack: "Stack 0",
    },
    {
      type: "bar" as const,
      label: "positive word",
      backgroundColor: "rgb(255, 99, 132)",
      // data: [10, 5, 6, 16, 9, 9, 18, 19, 15, 36],
      data: [
        10, 5, 6, 16, 9, 9, 18, 19, 15, 36, 10, 5, 6, 16, 9, 9, 18, 19, 15, 36,
        10, 5, 6, 16, 9, 9, 18, 19, 15, 36, 36, 18, 19, 15, 36, 36,
      ], // monthly data
      borderColor: "white",
      borderWidth: 2,
      stack: "Stack 0",
    },
  ],
};

function Graph() {
  const [alignment, setAlignment] = React.useState("weekly");
  const [user, dispatch] = useContext(UserContext);
  useEffect(() => {
    console.log(user);
    let timezoneOffset = new Date().getTimezoneOffset() * 60000;
    let timezoneDate = new Date(
      Date.now() - timezoneOffset - 1000 * 60 * 60 * 24 * 12,
    );
    /**
     * var timezoneOffset = new Date().getTimezoneOffset() * 60000;
     * var timezoneDate = new Date(Date.now() - timezoneOffset);
     * timezoneDate.toISOString(); // 요고!
     */
    if (user) {
      findEmotionByDateRange(
        user.id,
        timezoneDate,
        new Date(timezoneDate.getTime() + 1000 * 60 * 60 * 24 * 7),
      ).then((result) => {
        console.log(`result: `, result.data);
      });
    }
  }, []);
  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string,
  ) => {
    console.log(newAlignment);
    if (newAlignment !== null) {
      setAlignment(newAlignment);
    }
    if (newAlignment == "monthly") {
      console.log(1);
    }
  };
  return (
    <Box>
      <Typography variant='body2' sx={{ textAlign: "center" }}>
        분석 단위
      </Typography>
      <Box sx={{ textAlign: "center" }}>
        <ToggleButtonGroup
          color='primary'
          value={alignment}
          exclusive
          onChange={handleChange}>
          <ToggleButton value='weekly'>Weekly</ToggleButton>
          <ToggleButton value='monthly'>Monthly</ToggleButton>
        </ToggleButtonGroup>
        <Box>{alignment === "weekly" ? <WeekPicker /> : <MonthPicker />}</Box>
      </Box>
      <Chart data={data} type='bar' options={options} />
    </Box>
  );
}

export default Graph;
