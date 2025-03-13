export default interface HistoryData {
  time: Date;
  bet: number;
  direction: "up" | "down";
  finalValue: number;
  benefit: number;
}
