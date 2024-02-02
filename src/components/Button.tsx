import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: () => void;
  icon?: React.ReactNode;
  text: string;
  rounded?: boolean;
  fill?: boolean;
  status?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  text = null,
  icon = null,
  onClick = () => console.log("Clicked"),
  rounded = false,
  fill = true,
  status = true,
}) => {
  const buttonStyle = `flex-row text-sm p-4 rounded ${
    !status
      ? "bg-gray-400 text-gray-700"
      : fill
      ? "bg-blue-400 text-white"
      : "text-blue-500 border-blue-500 border-2"
  } ${rounded ? "rounded" : ""}`;

  return (
    <button
      onClick={onClick}
      className={buttonStyle}
      disabled={!status} // If status is false (disabled), disable the button
    >
      {icon}
      {text}
    </button>
  );
};

export default Button;
