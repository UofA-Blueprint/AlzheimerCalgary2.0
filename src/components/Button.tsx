import React from "react";
import { Plus } from "@phosphor-icons/react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: () => void;
  icon?: boolean;
  text?: string;
  rounded?: boolean;
  fill?: boolean;
  status?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  text = null,
  icon = false,
  onClick = () => console.log("Clicked"),
  rounded = false,
  fill = true,
  status = true,
}) => {
  const buttonStyle = `flex flex-row text-sm p-4 ${
    !status
      ? "bg-gray-100 text-gray-400"
      : fill
      ? "bg-blue-400 text-white"
      : "text-blue-500 border-blue-500 border-2"
  } ${rounded ? "rounded-full" : "rounded-lg"}`;

  return (
    <button
      onClick={onClick}
      className={buttonStyle}
      disabled={!status} // Placeholder to make it prettier
    >
      {icon && !text && <Plus className="" />}
      {icon && text && <Plus className="mt-1" />}
      {text && <span className="pl-1.5">{text}</span>}
    </button>
  );
};

export default Button;
