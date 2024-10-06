interface CoolButtonProps {
  icon?: React.FC;
  text?: string;
  size?: "sm" | "md" | "lg";
  color?: "dark" | "green" | "none";
  onClick?: () => void;
  style?: React.CSSProperties;
}

export const CoolButton: React.FC<CoolButtonProps> = ({
  icon,
  text,
  size = "lg",
  color = "dark",
  style,
  onClick,
}) => {
  const Icon = icon; // $fancy

  let className = "rounded-lg font-bold text-sm w-fit";

  switch (size) {
    case "sm":
    case "md":
      className += " py-[10px] px-[20px] text-[14px]";
      break;
    case "md":
      className += " py-[14px] px-[42px] text-[18px]";
      break;
    case "lg":
      className += " py-[14px] px-[42px] text-[24px]";
      break;
    default:
      break;
  }

  switch (color) {
    case "green":
      className +=
        " bg-[#BCFE1E] ease-in-out duration-200 hover:bg-[#BCFE1E]/[.8] border-white/[.29] text-black";
      break;
    case "none":
      className +=
        " bg-[transparant] ease-in-out duration-200 hover:text-[grey] text-white";
      break;
    default:
      className +=
        " bg-white/[.05] ease-in-out duration-200 hover:bg-white/[.2] text-white";
      break;
  }

  return (
    <button style={style} className={className} onClick={onClick}>
      {Icon && <Icon />}
      <span>{text}</span>
    </button>
  );
};
