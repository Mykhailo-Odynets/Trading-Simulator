import HistoryData from "../../utils/HistoryData";
import "./HistorySection.css";

interface HistorySectionProps {
  data: HistoryData[];
}

export default function HistorySection({ data }: HistorySectionProps) {
  return (
    <table className="table">
      {/* <caption>History</caption> */}
      <thead>
        <tr>
          <th>Time</th>
          <th>Bet</th>
          <th>Direction</th>
          <th>Final Value</th>
          <th>Benefit</th>
        </tr>
      </thead>
      <tbody>
        {data.map((record: HistoryData, index: number) => (
          <tr key={index}>
            <td>{record.time.toLocaleString()}</td>
            <td>{record.bet}</td>
            <td>{record.direction}</td>
            <td>{record.finalValue}</td>
            <td>{record.benefit}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
