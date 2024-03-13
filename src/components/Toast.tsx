import clsx from "clsx";
import { Warning, WarningCircle, Check, Info } from "@phosphor-icons/react"; 


interface ToastIconProps {
  /** The theme of the toast */
  severity?: "success" | "error" | "warning" | "info" | "neutral", 
}

function ToastIcon({ severity }: ToastIconProps) {
  if (severity === "success") {
    return <Check className="text-status-green-main" size={24}/>;
  } else if (severity === "error") {
    return <WarningCircle className="text-status-red-main" size={24}/>;
  } else if (severity === "warning") {
    return <Warning className="text-status-yellow-main" size={24}/>;
  } else if (severity === "info") {
    return <Info className="text-status-blue-main" size={24}/>;
  } else {
    return null;
  }
}

interface ToastProps {
  /** The text to display inside the toast */
  message: string,

  /** The theme of the toast */
  severity?: "success" | "error" | "warning" | "info" | "neutral",
}

function Toast({ message, severity = "neutral" }: ToastProps) {

  // Body style
  const body = "flex py-2 pl-4 pr-6 rounded gap-2";

  // Themes
  const success = "bg-status-green-light";
  const error = "bg-status-red-light";
  const warning = "bg-status-yellow-light";
  const info = "bg-status-blue-light";
  const neutral = "bg-neutrals-light-300";

  return (
    <div className={clsx(body, {
      [success]: severity === "success",
      [error]: severity === "error",
      [warning]: severity === "warning",
      [info]: severity === "info",
      [neutral]: severity === "neutral"
    })}>
      <ToastIcon severity={ severity }/>
      <span className="text-neutrals-dark-500">{ message }</span>
    </div>
  )
}

export default Toast;