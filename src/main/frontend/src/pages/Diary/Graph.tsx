import React from "react";
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
import { Typography } from "@mui/material";

// option #1
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
  Title, // option #2
);

// option #2
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend
// );

const labels = ["7/24", "7/25", "7/31", "8/1", "8/2", "8/4", "8/7", "8/8", "8/10", "8/15"];

// option #2
const options = {
  // plugins: {
  //   title: {
  //     display: true,
  //     text: '감정 그래프', 
  //   },
  // },
  responsive: true,
  interaction: {
    mode: 'index' as const,
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
      data: [10, 2, -9, 6, 3, 7, 7, 17, -15, 31],
    },
    {
      type: "bar" as const,
      label: "negative word",
      backgroundColor: "rgb(53, 162, 235)",
      data: [0, -3, -15, -10, -6, -2, -11, -2, -30, -5],
      borderColor: "white",
      borderWidth: 2,
      // stack: 'Stack 0', // option #2
    },
    {
      type: "bar" as const,
      label: "positive word",
      backgroundColor: "rgb(255, 99, 132)",
      data: [10, 5, 6, 16, 9, 9, 18, 19, 15, 36],
      borderColor: "white",
      borderWidth: 2,
      // stack: 'Stack 0', // option #2
    },
  ],
};

function Graph() {
  return (
    <div>
      <Chart data={data} type='bar' />
      {/* <Chart data={data} type='bar' options={options} /> */} // option #2

      <Typography variant='h5'>감정 그래프</Typography>
      <Typography variant='body1'>이번 주</Typography>
      <Typography variant='body1'>긍정 점수</Typography>
      <Typography variant='body1'>2</Typography>
      <Typography variant='body1'>부정 점수</Typography>
      <Typography variant='body1'>-1</Typography>
      <Typography variant='body1'>총 점수</Typography>
      <Typography variant='body1'>1</Typography>
    </div>
  );
}

export default Graph;
