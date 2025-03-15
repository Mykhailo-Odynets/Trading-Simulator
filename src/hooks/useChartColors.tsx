import { useState, useEffect, useCallback } from "react";
import getChartColors from "../utils/ChartColors.ts";

export const useChartColors = () => {
  const [chartColors, setChartColors] = useState(getChartColors());

  const updateChartColors = useCallback(() => {
    const newColors = getChartColors();
    setChartColors(newColors);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: light)");
    mediaQuery.addEventListener("change", updateChartColors);
    updateChartColors();

    return () => {
      mediaQuery.removeEventListener("change", updateChartColors);
    };
  }, [updateChartColors]);

  return chartColors;
};