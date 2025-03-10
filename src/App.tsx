import { ChangeEvent, useState } from "react";
import LogoIcon from "./components/LogoIcon.jsx";
import DynamicChart from "./components/DynamicChart.jsx";

function App() {
  const [balance, setBalance] = useState(0);

  const handleBalanceChange = (event: ChangeEvent<HTMLInputElement>) => {
    setBalance(Number(event.target.value));
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
              <DynamicChart />
              <div className="betZone__inputSide">
                <p className="small">Your balance:</p>
                <p>{balance}</p>
                <input
                  type="number"
                  value={balance}
                  onChange={handleBalanceChange}
                />
              </div>
            </div>
          </article>
          <article></article>
        </main>
      </div>
    </>
  );
}

export default App;
