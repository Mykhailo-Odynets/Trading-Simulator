type Props = {
  iconText: string;
  btnColor: string;
};

export default function Button({ iconText, btnColor }: Props) {
  return (
    <button style={{ background: btnColor }}>
      <span className="icon-">{iconText}</span>
    </button>
  );
}
