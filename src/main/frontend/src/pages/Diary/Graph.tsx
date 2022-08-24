import { Box } from "@mui/material";
import {
  BarController,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import React, { useContext, useEffect, useState } from "react";
import { Chart } from "react-chartjs-2";
import WeekPicker from "../../components/molecules/WeekPicker";
import { findEmotionByDateRange, findEmotionByUid } from "../../apis/emotions";
import { UserContext } from "../../contexts/UserProvider";

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

const labels = ["8/1", "8/2", "8/4", "8/7", "8/8", "8/10", "8/12"];

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

const data = ({
  total,
  positive,
  negative,
}: {
  total: number[];
  positive: number[];
  negative: number[];
}) => ({
  labels,
  datasets: [
    {
      type: "line" as const,
      label: "total score",
      borderColor: "rgb(75, 192, 192)",
      borderWidth: 2,
      fill: false,
      data: total,
    },
    {
      type: "bar" as const,
      label: "negative word",
      backgroundColor: "rgb(53, 162, 235)",
      data: negative,
      borderColor: "white",
      borderWidth: 2,
      stack: "Stack 0",
    },
    {
      type: "bar" as const,
      label: "positive word",
      backgroundColor: "rgb(255, 99, 132)",
      data: positive,
      borderColor: "white",
      borderWidth: 2,
      stack: "Stack 0",
    },
  ],
});

function Graph() {
  const [user, dispatch] = useContext(UserContext);
  const [userEmotions, setUserEmotions] = useState([]);
  const [startEndDay, setStartEndDay] = useState(null);
  const [graphData, setGraphData] = useState({
    total: [],
    positive: [],
    negative: [],
  });

  useEffect(() => {
    if (startEndDay === null) {
      return;
    }

    let offset = new Date().getTimezoneOffset() * 60000;
    let startDate = new Date(startEndDay.start.getTime() - offset);
    let endDate = new Date(startEndDay.end.getTime() - offset);

    if (user) {
      findEmotionByDateRange(user.id, startDate, endDate).then((result) => {
        let total: number[] = [];
        let negative: number[] = [];
        let positive: number[] = [];
        result.data.forEach((emo: any, idx: number) => {
          if (!emo) return;
          if (idx > 0) {
            if (!result[idx - 1]) return;
            const before = new Date(result[idx - 1].regdate);
            const now = new Date(emo.regdate);
            if (before.getDate() === now.getDate()) return;
          }
          total.push(emo.score);
          negative.push(emo.negative.score);
          positive.push(emo.positive.score);
        });
        setGraphData({
          total,
          negative,
          positive,
        });
      });
    }
  }, [startEndDay]);

  useEffect(() => {
    if (user) {
      findEmotionByUid(user.id).then((result) => {
        setUserEmotions(result);
      });
    }
  }, []);

  return (
    <Box>
      <Box sx={{ textAlign: "center" }}>
        <WeekPicker
          setStartEndDay={setStartEndDay}
          userEmotions={userEmotions}
        />
      </Box>
      <Chart data={data(graphData)} type='bar' options={options} />
    </Box>
  );
}

export default Graph;
