import { ChangeEvent, useEffect, useState } from "react";
import DynamicChart from "./components/DynamicChart/DynamicChart.tsx";
import Button from "./components/Button/Button.js";
import HistorySection from "./components/HistorySection/HistorySection.js";
import { useChartData } from "./hooks/useChartData.tsx";
import Header from "./components/Header/Header.tsx";
import HistoryData from "./utils/HistoryData.ts";
import BetData from "./utils/BetData.ts";

function App() {
  const [balance, setBalance] = useState<number>(10000);

  const [inputValue, setInputValue] = useState<number | null>(null);
  const [lastChartData, setLastChartData] = useState<number>();
  const [bet, setBet] = useState<BetData | null>(null);

  const [historyData, setHistoryData] = useState<HistoryData[]>([
    {
      time: new Date(),
      bet: 250,
      direction: "up",
      finalValue: 642,
      benefit: 642 - 250,
    },
    {
      time: new Date(),
      bet: 100,
      direction: "down",
      finalValue: 946,
      benefit: 100 - 946,
    },
  ]);

  const chartData = useChartData();


  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(Number(event.target.value));
  };
  const handleDataUpdate = (data: number) => {
    setLastChartData(data);
  };
  const handleBtnClick = (btn: "up" | "down") => {
    if (inputValue === null || bet !== null || balance - inputValue < 0 || inputValue === 0) return;
    setInputValue(null);
    setBet({
      bet: inputValue,
      direction: btn,
      currentChartData: lastChartData ?? 0
    });
    setBalance((balance) => balance - inputValue);


  }


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
                  <p>{balance}</p>
                </div>
                <input type="number" value={inputValue ?? ""} placeholder={"Enter bet..."} onChange={handleInputChange} />
                <Button iconText="icon-triangle-down" btnColor="var(--down)" onBtnClick={handleBtnClick} />
                <Button iconText="icon-triangle-up" btnColor="var(--up)" onBtnClick={handleBtnClick} />
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
