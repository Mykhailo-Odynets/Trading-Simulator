export default function getChartColors() {
  const rootStyles = getComputedStyle(document.documentElement);
  return {
    chartColor: rootStyles.getPropertyValue("--blocks").trim(),
    color: rootStyles.getPropertyValue("--primary").trim(),
  };
}
