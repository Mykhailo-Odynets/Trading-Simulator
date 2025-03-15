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

const labels: string[] = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
];



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
  onDataUpdate: (data: number) => void,
  chartData: ChartData;
}

export default function DynamicChart({ onDataUpdate, chartData }: DynamicChartProps) {
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
  
  // const [chartColors, setChartColors] = useState(getChartColors);
  // const [chartData, setChartData] = useState<ChartData>({
  //   labels,
  //   datasets: [
  //     {
  //       label: "Sales",
  //       data: [1, 2, 3, 4, 5, 6, 7],
  //       backgroundColor: chartColors.color,
  //       borderColor: chartColors.color,
  //       borderWidth: 1,
  //     },
  //   ],
  // });
  // const [options, setOptions] = useState(
  //   createOptions(chartColors.color, chartColors.chartColor)
  // );

  // const updateChartColors = useCallback(() => {
  //   const newColors = getChartColors();
  //   setChartColors(newColors);
  //   setOptions(createOptions(newColors.color, newColors.chartColor));
  //   setChartData((prevData) => ({
  //     ...prevData,
  //     datasets: prevData.datasets.map((dataset) => ({
  //       ...dataset,
  //       backgroundColor: newColors.color,
  //       borderColor: newColors.color,
  //     })),
  //   }));
  // }, []);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setChartData((prevData) => {
  //       const updatedData = {
  //         ...prevData,
  //         datasets: prevData.datasets.map((dataset) => ({
  //           ...dataset,
  //           data: dataset.data.map(
  //             (value) => value + Math.floor(Math.random() * 10)
  //           ),
  //         })),
  //       };
  //       return updatedData;
  //     });
  //   }, 1000);

  //   const mediaQuery = window.matchMedia("(prefers-color-scheme: light)");
  //   mediaQuery.addEventListener("change", updateChartColors);
  //   updateChartColors();

  //   return () => {
  //     clearInterval(interval);
  //     mediaQuery.removeEventListener("change", updateChartColors);
  //   };
  // }, [updateChartColors]);

  // useEffect(() => {
  //   if (chartData.datasets[0].data.length > 0) {
  //     onDataUpdate(chartData.datasets[0].data[0]);
  //   }
  // }, [chartData, onDataUpdate]);

  // return (
  //   <div className="chartContainer">
  //     <Line options={options} data={chartData} />
  //   </div>
  // );
}
