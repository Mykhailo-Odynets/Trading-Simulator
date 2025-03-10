// import { useState, useEffect } from "react";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import { Line } from "react-chartjs-2";
// import ChartData from "../utils/ChartData";
// import "../styles/main.css";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend
// );

// const labels: string[] = [
//   "January",
//   "February",
//   "March",
//   "April",
//   "May",
//   "June",
//   "July",
// ];

// // const rootStyles = getComputedStyle(document.documentElement);
// // const chartColor = rootStyles.getPropertyValue("--blocks").trim();
// // const color = rootStyles.getPropertyValue("--primary").trim();

// // const options = {
// //   responsive: true,
// //   scales: {
// //     x: {
// //       ticks: {
// //         color: color,
// //       },
// //       grid: {
// //         color: chartColor,
// //       },
// //     },
// //     y: {
// //       ticks: {
// //         color: color,
// //       },
// //       grid: {
// //         color: chartColor,
// //       },
// //     },
// //   },
// //   plugins: {
// //     legend: {
// //       display: false,
// //     },
// //   },
// // };

// const getChartColors = () => {
//   const rootStyles = getComputedStyle(document.documentElement);
//   const chartColor = rootStyles.getPropertyValue("--blocks").trim();
//   const color = rootStyles.getPropertyValue("--primary").trim();
//   return { chartColor, color };
// };

// export default function DynamicChart() {
//   const { chartColor, color } = getChartColors();
//   const [chartData, setChartData] = useState<ChartData>({
//     labels: labels,
//     datasets: [
//       {
//         label: "Sales",
//         data: [1, 2, 3, 4, 5, 6, 7],
//         backgroundColor: color,
//         borderColor: color,
//         borderWidth: 1,
//       },
//     ],
//   });
//   const [options, setOptions] = useState({
//     responsive: true,
//     scales: {
//       x: {
//         ticks: {
//           color: color,
//         },
//         grid: {
//           color: chartColor,
//         },
//       },
//       y: {
//         ticks: {
//           color: color,
//         },
//         grid: {
//           color: chartColor,
//         },
//       },
//     },
//     plugins: {
//       legend: {
//         display: false,
//       },
//     },
//   });

//   useEffect(() => {
//     const updateColors = () => {
//       const { chartColor, color } = getChartColors();
//       setOptions((prevOptions) => ({
//         ...prevOptions,
//         scales: {
//           x: {
//             ticks: {
//               color: color,
//             },
//             grid: {
//               color: chartColor,
//             },
//           },
//           y: {
//             ticks: {
//               color: color,
//             },
//             grid: {
//               color: chartColor,
//             },
//           },
//         },
//       }));
//       setChartData((prevData) => ({
//         ...prevData,
//         datasets: [
//           {
//             ...prevData.datasets[0],
//             backgroundColor: color,
//             borderColor: color,
//           },
//         ],
//       }));
//     };

//     const interval = setInterval(() => {
//       setChartData((prevData) => ({
//         ...prevData,
//         datasets: [
//           {
//             ...prevData.datasets[0],
//             data: prevData.datasets[0].data.map(
//               (value) => value + Math.floor(Math.random() * 10)
//             ),
//           },
//         ],
//       }));
//     }, 1000);

//     const mediaQuery = window.matchMedia("(prefers-color-scheme: light)");

//     // Initial check
//     updateColors();

//     // Listen for changes in the color scheme
//     mediaQuery.addEventListener("change", updateColors);

//     // Cleanup listener on component unmount
//     return () => {
//       clearInterval(interval);
//       mediaQuery.removeEventListener("change", updateColors);
//     };
//   }, []);

//   return <Line options={options} data={chartData} />;
// }
import { useState, useEffect, useCallback } from "react";
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

const getChartColors = () => {
  const rootStyles = getComputedStyle(document.documentElement);
  return {
    chartColor: rootStyles.getPropertyValue("--blocks").trim(),
    color: rootStyles.getPropertyValue("--primary").trim(),
  };
};

const createOptions = (color: string, chartColor: string) => ({
  responsive: true,
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

export default function DynamicChart() {
  const [chartColors, setChartColors] = useState(getChartColors);
  const [chartData, setChartData] = useState<ChartData>({
    labels,
    datasets: [
      {
        label: "Sales",
        data: [1, 2, 3, 4, 5, 6, 7],
        backgroundColor: chartColors.color,
        borderColor: chartColors.color,
        borderWidth: 1,
      },
    ],
  });
  const [options, setOptions] = useState(
    createOptions(chartColors.color, chartColors.chartColor)
  );

  const updateChartColors = useCallback(() => {
    const newColors = getChartColors();
    setChartColors(newColors);
    setOptions(createOptions(newColors.color, newColors.chartColor));
    setChartData((prevData) => ({
      ...prevData,
      datasets: prevData.datasets.map((dataset) => ({
        ...dataset,
        backgroundColor: newColors.color,
        borderColor: newColors.color,
      })),
    }));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setChartData((prevData) => ({
        ...prevData,
        datasets: prevData.datasets.map((dataset) => ({
          ...dataset,
          data: dataset.data.map(
            (value) => value + Math.floor(Math.random() * 10)
          ),
        })),
      }));
    }, 1000);

    const mediaQuery = window.matchMedia("(prefers-color-scheme: light)");
    mediaQuery.addEventListener("change", updateChartColors);
    updateChartColors();

    return () => {
      clearInterval(interval);
      mediaQuery.removeEventListener("change", updateChartColors);
    };
  }, [updateChartColors]);

  return <Line options={options} data={chartData} />;
}
