import { TabTypeMap } from "@mui/material";
import {
	ChartData,
	Chart as ChartJS,
	LineElement,
	CategoryScale,
	PointElement,
	LinearScale,
  ChartTypeRegistry,
  BarElement,
} from "chart.js";
import React from "react";
import { Chart } from "react-chartjs-2";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, BarElement);

const data: ChartData<keyof ChartTypeRegistry, number[], string> = {
	labels: ["January", "February", "March", "April", "May", "June", "July"],
	datasets: [
		{
			type: "line",
			label: "Dataset 1",
			borderColor: "rgb(54, 162, 235)",
			borderWidth: 2,
			data: [1, 2, 3, 4, 5],
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
		<>
			<Chart data={data} type={'line'} />
		</>
	);
}

export default Graph;
