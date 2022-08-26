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
import { findEmotionByDateRange, findEmotionByUid } from "../../apis/emotions";
import WeekPicker from "../../components/molecules/WeekPicker";
import { UserContext } from "../../contexts/UserProvider";
import { getWeekFormat, getWeeks } from "../../tools/utils";

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

const data = (
  labels: string[],
  {
    total,
    positive,
    negative,
  }: {
    total: number[];
    positive: number[];
    negative: number[];
  },
) => ({
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
  const [labels, setLabels] = useState<any[]>([]);
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
    const dateLabes: any[] = getWeekFormat(getWeeks(startDate));
    setLabels(dateLabes);

    if (user.id) {
      findEmotionByDateRange(user.id, startDate, endDate).then((result) => {
        let total: number[] = [];
        let negative: number[] = [];
        let positive: number[] = [];
        const dates = result.data.sort(
          (a: any, b: any) =>
            new Date(a.regdate).getTime() - new Date(b.regdate).getTime(),
        );
        for (let label of dateLabes) {
          const [mon, day] = label.split("/");
          const foundDate = dates.find((date: any) => {
            return (
              new Date(date.regdate).getMonth() === Number(mon) - 1 &&
              new Date(date.regdate).getDate() === Number(day)
            );
          });
          if (foundDate) {
            total.push(foundDate.score);
            negative.push(foundDate.negative.score);
            positive.push(foundDate.positive.score);
          } else {
            total.push(null);
            negative.push(null);
            positive.push(null);
            delete total[total.length - 1];
            delete negative[negative.length - 1];
            delete positive[positive.length - 1];
          }
        }
        setGraphData({
          total,
          negative,
          positive,
        });
      });
    }
  }, [user.id, startEndDay]);

  useEffect(() => {
    if (user.id) {
      findEmotionByUid(user.id).then((result) => {
        setUserEmotions(result);
      });
    }
  }, [user.id]);

  return (
    <Box>
      <Box sx={{ textAlign: "center" }}>
        <WeekPicker
          setStartEndDay={setStartEndDay}
          userEmotions={userEmotions}
        />
      </Box>
      <Chart data={data(labels, graphData)} type='bar' options={options} />
    </Box>
  );
}

export default Graph;
