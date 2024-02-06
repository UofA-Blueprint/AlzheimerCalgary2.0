import React, { useEffect, useRef, useState } from "react";
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
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [fontSize, setFontSize] = useState("1em");

  useEffect(() => {
    if (text) {
      const width = buttonRef.current?.offsetWidth;
      console.log(`Button width: ${width}`);
      // size adjustment could be error since hand adjusted it
      // probably adjust it later or ask for advise
      if (width) {
        if (width > 200) {
          setFontSize(`${width / 14}px`);
        } else if (width > 100) {
          setFontSize(`${width / 11}px`);
        } else {
          setFontSize(`${width / 7}px`);
        }
      }
    }
  }, [text]);
  const buttonClassName = `flex flex-row items-center justify-center p-4 ${
    !status
      ? "bg-neutrals-light-200 text-gray-400"
      : fill
      ? "bg-primary-main text-white"
      : "text-primary-dark border-primary-dark border-2"
  } ${rounded ? "rounded-full" : "rounded-lg"} w-full h-full`;

  return (
    <button
      ref={buttonRef}
      style={{ fontSize }}
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
