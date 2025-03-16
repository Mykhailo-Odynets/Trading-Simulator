import { useState } from "react";
import DynamicChart from "./components/DynamicChart/DynamicChart.tsx";
import Button from "./components/Button/Button.js";
import HistorySection from "./components/HistorySection/HistorySection.js";
import { useChartData } from "./hooks/useChartData.tsx";
import Header from "./components/Header/Header.tsx";
import HistoryData from "./utils/HistoryData.ts";

function App() {
  const [lastChartData, setLastChartData] = useState<number | null>(null);
  const [historyData, setHistoryData] = useState<HistoryData[]>([
    {
      time: new Date(),
      bet: 123,
      direction: "up",
      finalValue: 642,
      benefit: 642 - 123,
    },
    {
      time: new Date(),
      bet: 123,
      direction: "up",
      finalValue: 642,
      benefit: 642 - 123,
    },
  ]);
  const chartData = useChartData();

  // const [balance, setBalance] = useState(1000);
  // const handleBalanceChange = (event: ChangeEvent<HTMLInputElement>) => {
  //   setBalance(Number(event.target.value));
  // };

  const handleDataUpdate = (data: number) => {
    setLastChartData(data);
  };

  return (
    <>
      <div className="container">
        <Header />
        <main>
          <article>
            <div className="betZone">
              <DynamicChart
                onDataUpdate={handleDataUpdate}
                chartData={chartData}
              />
              <div className="betZone__inputSide">
                <div className="betZone__text">
                  <p>Your balance:</p>
                  <p>{lastChartData}</p>
                </div>
                <input type="number" placeholder="Enter bet..." />
                <Button iconText="icon-triangle-down" btnColor="var(--down)" />
                <Button iconText="icon-triangle-up" btnColor="var(--up)" />
              </div>
            </div>
          </article>
          <article>
            <HistorySection data={historyData} />
          </article>
        </main>
      </div>
    </>
  );
}

export default App;
