import "./Button.css";

const Button = ({ children, onClick = (e) => {}, isRainbow = false }) => {
  return (
    <button
      className={`Button ${isRainbow ? "rainbow" : ""}`}
      onClick={(e) => onClick(e)}
    >
      {children}
    </button>
  );
};

export default Button;
