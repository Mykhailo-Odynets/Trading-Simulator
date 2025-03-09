// import { useState } from "react";
import LogoIcon from "./components/LogoIcon.jsx";
import DynamicChart from "./components/DynamicChart.jsx";

function App() {
  // const [count, setCount] = useState(0);

  return (
    <>
      <div className="container">
        <header className="header">
          <LogoIcon />
          <p>Trading Simulator</p>
        </header>
        <DynamicChart />
      </div>
    </>
  );
}

export default App;
