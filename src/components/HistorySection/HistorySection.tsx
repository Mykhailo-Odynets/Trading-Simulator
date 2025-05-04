import HistoryData from "../../utils/HistoryData";
import "./HistorySection.css";

interface HistorySectionProps {
  data: HistoryData[];
}

export default function HistorySection({ data }: HistorySectionProps) {
  return (
    // <table className="table">
    //   {/* <caption>History</caption> */}
    //   <thead>
    //     <tr>
    //       <th>Time</th>
    //       <th>Bet</th>
    //       <th>Direction</th>
    //       <th>Final Value</th>
    //       <th>Benefit</th>
    //     </tr>
    //   </thead>
    //   <tbody>
    //     {data.map((record: HistoryData, index: number) => (
    //       <tr key={index}>
    //         <td>{record.time.toLocaleString()}</td>
    //         <td>{record.bet}</td>
    //         <td>{record.direction}</td>
    //         <td>{record.finalValue}</td>
    //         <td>{record.benefit}</td>
    //       </tr>
    //     ))}
    //   </tbody>
    // </table>
    <ul className="table">
      <li className="caption">
        <p>Time</p>
        <p>Bet</p>
        <p>Direction</p>
        <p>Final Value</p>
        <p>Benefit</p>
      </li>
      {data.map((record: HistoryData, index: number) => (
          <li key={index}>
            <p>Time</p>
            <p>{record.time.toLocaleString()}</p>
            <p>Bet</p>
            <p>{record.bet}</p>
            <p>Direction</p>
            <p style={{color: `var(--${record.direction})`}}>
              <span className="icon-">icon-triangle-{record.direction}</span>
            </p>
            <p>Final Value</p>
            <p>{record.finalValue}</p>
            <p>Benefit</p>
            <p>{record.benefit}</p>
          </li>
        ))}
    </ul>
  );
}
