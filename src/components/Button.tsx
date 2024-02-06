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
  // general detail
  const buttonClassName = `flex flex-row items-center justify-center p-4 
  ${rounded ? "rounded-full" : "rounded-lg"} w-full h-full`;

  // #color management
  const buttonStyle: React.CSSProperties = {
    backgroundColor: !status ? "#E4E4EB" : fill ? "#009FDF" : "transparent",
    color: !status ? "#8F90A6" : fill ? "white" : "#007BAC",
    border: !status || fill ? "none" : "2px solid #007BAC",
  };

  return (
    <button
      ref={buttonRef}
      style={{ fontSize, ...buttonStyle }}
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
