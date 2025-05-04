import { useState, useEffect } from "react";
import ChartData from "../utils/ChartData.ts";
import { useChartColors } from "./useChartColors.tsx";

const period: number = 2000;
const timeSteps = 5;

const generateTimes = (): string[] => {
  const now = new Date().getTime();
  const times: string[] = [];

  for (let i = timeSteps - 1; i >= 0; i--) {
    times.push(new Date(now - i * 2000).toLocaleTimeString());
  }

  return times;
};

const generateData = (): number[] => {
  const data: number[] = [];

  data.push(Math.random() * 1000);
  for (let i = 0; i < timeSteps - 1; i++) {
    data.push(getNextDataPoint(data));
  }

  return data;
};

const getNextDataPoint = (arr: number[]): number => {
  return arr.slice(-1)[0] + Math.floor(Math.random() * 20 - 10);
};

export const useChartData = () => {
  const chartColors = useChartColors();
  const [chartData, setChartData] = useState<ChartData>({
    labels: generateTimes(),
    datasets: [
      {
        label: "",
        data: generateData(),
        backgroundColor: chartColors.color,
        borderColor: chartColors.chartColor,
        borderWidth: 1,
        fill: false,
        tension: 0.1,
        pointRadius: 3,
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
      setChartData((prevData) => ({
        labels: [...prevData.labels.slice(1), new Date().toLocaleTimeString()],
        datasets: prevData.datasets.map((dataset, index) =>
          index === 0
            ? {
                ...dataset,
                data: [
                  ...dataset.data.slice(1),
                  getNextDataPoint(dataset.data),
                ],
              }
            : dataset
        ),
      }));
    }, period);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return chartData;
};
