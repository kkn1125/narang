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
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement
);

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
  const chartRef = useRef<ChartJS>(null);

  function triggerTooltip(chart: ChartJS | null) {
    const tooltip = chart?.tooltip;

    if (!tooltip) {
      return;
    }

    if (tooltip.getActiveElements().length > 0) {
      tooltip.setActiveElements([], { x: 0, y: 0 });
    } else {
      const { chartArea } = chart;

      tooltip.setActiveElements(
        [
          {
            datasetIndex: 0,
            index: 2,
          },
          {
            datasetIndex: 1,
            index: 2,
          },
        ],
        {
          x: (chartArea.left + chartArea.right) / 2,
          y: (chartArea.top + chartArea.bottom) / 2,
        }
      );
    }

    chart.update();
  }

  useEffect(() => {
    const chart = chartRef.current;

    triggerTooltip(chart);
  }, []);
  return (
    <div>
      <Chart data={data} type={"bar"} />
    </div>
  );

}

export default Graph;
