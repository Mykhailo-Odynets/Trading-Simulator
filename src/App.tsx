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

  const [timer, setTimer] = useState<number>(30);
  const [timerActive, setTimerActive] = useState<boolean>(false);

  const [historyData, setHistoryData] = useState<HistoryData[]>([]);

  const chartData = useChartData();

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(Number(event.target.value));
  };
  const handleDataUpdate = (data: number) => {
    setLastChartData(data);
  };
  const handleBtnClick = (btn: "up" | "down") => {
    if (
      inputValue === null ||
      bet !== null ||
      balance - inputValue < 0 ||
      inputValue <= 0
    )
      return;

    setInputValue(null);
    setBet({
      bet: inputValue,
      direction: btn,
      currentChartData: lastChartData ?? 0,
    });
    setBalance((balance) => balance - inputValue);

    const rootStyles = getComputedStyle(document.documentElement);
    const lineColor =
      btn === "up"
        ? rootStyles.getPropertyValue("--up").trim()
        : rootStyles.getPropertyValue("--down").trim();

    chartData.addBet({
      label: `Bet ${inputValue}`,
      data: Array(chartData.labels.length).fill(lastChartData ?? 0),
      backgroundColor: lineColor,
      borderColor: lineColor,
      borderWidth: 2,
      pointRadius: 0,
      tension: 0,
      fill: false,
    });

    setTimer(30);
    setTimerActive(true);
  };

  const handleTimerComplete = () => {
    setTimerActive(false);

    // Process bet results
    if (bet) {
      const outcome = lastChartData || 0;
      const initialValue = bet.currentChartData;
      const isWin =
        (bet.direction === "up" && outcome > initialValue) ||
        (bet.direction === "down" && outcome < initialValue);

      // Calculate profit/loss
      const profit = isWin ? bet.bet : -bet.bet;

      // Update balance
      setBalance((prevBalance) => prevBalance + (isWin ? bet.bet * 2 : 0));

      // Add to history
      setHistoryData((prevHistory) => [
        {
          time: new Date(),
          bet: bet.bet,
          direction: bet.direction,
          finalValue: outcome,
          benefit: profit,
        },
        ...prevHistory,
      ]);

      chartData.removeBet();
      // Reset bet
      setBet(null);
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (timerActive && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timerActive && timer === 0) {
      // Handle timer completion
      handleTimerComplete();
    }

    // Clean up interval on unmount
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timer, timerActive]);

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
                <input
                  type="number"
                  value={inputValue ?? ""}
                  placeholder={"Enter bet..."}
                  onChange={handleInputChange}
                />
                <Button
                  iconText="icon-triangle-down"
                  btnColor="var(--down)"
                  onBtnClick={handleBtnClick}
                />
                <Button
                  iconText="icon-triangle-up"
                  btnColor="var(--up)"
                  onBtnClick={handleBtnClick}
                />
                {timerActive && (
                  <div
                    className={`betZone__timer ${
                      timer <= 5
                        ? "betZone__timer--critical"
                        : timer <= 10
                        ? "betZone__timer--warning"
                        : ""
                    }`}
                  >
                    Bet resolves in <span>{timer}</span> seconds
                  </div>
                )}
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
