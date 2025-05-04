import "./Button.css";

type Props = {
  iconText: string;
  btnColor: string;
  onBtnClick: (btn: "up" | "down") => void;
};

export default function Button({ iconText, btnColor, onBtnClick }: Props) {
  return (
    <button
      className="Button"
      onClick={() => {
        const action = iconText.split("-")[2];
        if (action === "up" || action === "down") {
          onBtnClick(action);
        }
      }}
      style={{ background: btnColor }}
    >
      <span className="icon-">{iconText}</span>
    </button>
  );
}
