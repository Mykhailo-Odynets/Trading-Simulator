import { useState, useEffect } from "react";
import ChartData from "../utils/ChartData.ts";
import { useChartColors } from "./useChartColors.tsx";

const labels = ["January", "February", "March", "April", "May", "June", "July"];

export const useChartData = () => {
  const chartColors = useChartColors();
  const [chartData, setChartData] = useState<ChartData>({
    labels,
    datasets: [
      {
        label: "Sales",
        data: [1, 2, 3, 4, 5, 6, 7],
        backgroundColor: chartColors.color,
        borderColor: chartColors.chartColor,
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    setChartData((prevData) => {
      const updatedData = {
        ...prevData,
        datasets: prevData.datasets.map((dataset) => ({
          ...dataset,
          backgroundColor: chartColors.color,
          borderColor: chartColors.chartColor,
        })),
      };
      return updatedData;
    });
  }, [chartColors]);

  useEffect(() => {
    const interval = setInterval(() => {
      setChartData((prevData) => {
        const updatedData = {
          ...prevData,
          datasets: prevData.datasets.map((dataset) => ({
            ...dataset,
            data: dataset.data.map(
              (value) => value + Math.floor(Math.random() * 10)
            ),
          })),
        };
        return updatedData;
      });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return chartData;
};
