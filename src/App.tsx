import { useState } from "react";
import LogoIcon from "./components/LogoIcon.jsx";
import DynamicChart from "./components/DynamicChart.jsx";
import Button from "./components/Button.js";
import HistorySection from "./components/HistorySection.js";

function App() {
  // const [balance, setBalance] = useState(1000);
  const [lastChartData, setLastChartData] = useState<number | null>(null);

  // const handleBalanceChange = (event: ChangeEvent<HTMLInputElement>) => {
  //   setBalance(Number(event.target.value));
  // };
  const handleDataUpdate = (data: number) => {
    setLastChartData(data);
  };

  return (
    <>
      <div className="container">
        <header className="header">
          <LogoIcon />
          <p>Trading Simulator</p>
        </header>
        <main>
          <article>
            <div className="betZone">
              <DynamicChart onDataUpdate={handleDataUpdate} />
              <div className="betZone__inputSide">
                <div className="betZone__text">
                  <p>Your balance:</p>
                  <p>{lastChartData}</p>
                </div>
                <input
                  type="number"
                  // value={}
                  placeholder="Enter bet..."
                />
                <Button iconText="icon-triangle-down" btnColor="var(--down)" />
                <Button iconText="icon-triangle-up" btnColor="var(--up)" />
              </div>
            </div>
          </article>
          <article>
            <div className="history__titles">
              <p>Time</p>
              <p>Bet</p>
              <p>Way</p>
              <p>Final</p>
              <p>Benefit</p>
            </div>
            <HistorySection />
          </article>
        </main>
      </div>
    </>
  );
}

export default App;
