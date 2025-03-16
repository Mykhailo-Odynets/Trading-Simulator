import { useEffect } from "react";
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
import ChartData from "../../utils/ChartData";
import getChartColors from "../../utils/ChartColors";
import "./DynamicChart.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const createOptions = (color: string, chartColor: string) => ({
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      ticks: { color },
      grid: { color: chartColor },
    },
    y: {
      ticks: { color },
      grid: { color: chartColor },
    },
  },
  plugins: { legend: { display: false } },
});

interface DynamicChartProps {
  onDataUpdate: (data: number) => void;
  chartData: ChartData;
}

export default function DynamicChart({
  onDataUpdate,
  chartData,
}: DynamicChartProps) {
  const chartColors = getChartColors();
  const options = createOptions(chartColors.color, chartColors.chartColor);

  useEffect(() => {
    if (chartData.datasets[0].data.length > 0) {
      onDataUpdate(chartData.datasets[0].data[0]);
    }
  }, [chartData, onDataUpdate]);

  return (
    <div className="chartContainer">
      <Line options={options} data={chartData} />
    </div>
  );
}
