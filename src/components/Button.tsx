import React, { useRef } from "react";
import { Plus } from "@phosphor-icons/react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: () => void;
  icon?: boolean;
  text?: string;
  rounded?: boolean;
  fill?: boolean;
  status?: string;
  fontSize?: string;
}

const Button: React.FC<ButtonProps> = ({
  text = null,
  icon = false,
  onClick = () => console.log("Clicked"),
  rounded = false,
  fill = true,
  status = "enabled",
  fontSize = "1em",
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const buttonClassName = `flex flex-row items-center justify-center p-4 ${
    status === "disabled"
      ? "bg-neutrals-light-200 text-gray-400"
      : fill
      ? "bg-primary-main text-white  hover:bg-primary-light active:bg-primary-dark  "
      : "text-primary-dark border-primary-dark border-2 hover:bg-neutrals-dark-100 active:bg-primary-dark active:text-white "
  } ${rounded ? "rounded-full" : "rounded-lg"} w-full h-full`;

  return (
    <button
      ref={buttonRef}
      style={{ fontSize: fontSize }}
      onClick={onClick}
      className={buttonClassName}
      disabled={!status}
    >
      {icon && !text && <Plus className="" />}
      {icon && text && (
        <>
          <Plus className="mt-0.2" />
          <span className="pl-1">{text}</span>
        </>
      )}
      {!icon && text && <span>{text}</span>}
    </button>
  );
};

export default Button;
