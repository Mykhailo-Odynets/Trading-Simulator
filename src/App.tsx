import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <header className="header">
        <span className="icon-">cheveron-up</span>
        <p>Traiding Simulator</p>
      </header>
    </>
  );
}

export default App;
