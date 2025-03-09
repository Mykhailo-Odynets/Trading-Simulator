import { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import ChartData from "../utils/ChartData";
import "../styles/main.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const labels: string[] = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
];

const rootStyles = getComputedStyle(document.documentElement);
const chartColor = rootStyles.getPropertyValue("--blocks").trim();
const color = rootStyles.getPropertyValue("--primary").trim();

const options = {
  responsive: true,
  scales: {
    x: {
      ticks: {
        color: color,
      },
      grid: {
        color: chartColor,
      },
    },
    y: {
      ticks: {
        color: color,
      },
      grid: {
        color: chartColor,
      },
    },
  },
  plugins: {
    legend: {
      display: false,
    },
  },
};

export default function DynamicChart() {
  const [chartData, setChartData] = useState<ChartData>({
    labels: labels,
    datasets: [
      {
        label: "Sales",
        data: [1, 2, 3, 4, 5, 6, 7],
        backgroundColor: color,
        borderColor: color,
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setChartData((prevData) => ({
        ...prevData,
        datasets: [
          {
            ...prevData.datasets[0],
            data: prevData.datasets[0].data.map(
              (value) => value + Math.floor(Math.random() * 10)
            ),
          },
        ],
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return <Line options={options} data={chartData} />;
}
