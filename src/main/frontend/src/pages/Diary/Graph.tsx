import React, { useEffect, useRef } from "react";
import { Chart } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  ChartTypeRegistry,
  ChartData,
  Tooltip,
  Legend,
} from "chart.js";
import { Typography } from "@mui/material";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Legend,
  Tooltip
);

const options = {
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

const labels = ["January", "February", "March", "April", "May", "June"];

const data: ChartData<keyof ChartTypeRegistry, number[], string> = {
  labels: labels,
  datasets: [
    {
      type: "line",
      label: "My First dataset",
      backgroundColor: "rgb(255, 99, 132)",
      borderColor: "rgb(255, 99, 132)",
      data: [0, 10, 5, 2, 20, 30, 45],
    },
    {
      type: "bar",
      label: "Dataset 2",
      backgroundColor: "rgb(255, 99, 132)",
      data: [1, 2, 3, 4, 5, 6],
      borderColor: "red",
      borderWidth: 2,
    },
    {
      type: "bar",
      label: "Dataset 3",
      backgroundColor: "rgb(75, 192, 192)",
      data: [1, 2, 3, 4, 5, 6],
    },
  ],
};

function Graph() {
  return (
    <div>
      <Chart data={data} type={"bar"} options={options} />

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
