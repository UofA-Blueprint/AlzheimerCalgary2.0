import { WarningCircle } from "@phosphor-icons/react";
import { useRef, useState } from "react";
import { Eye, EyeSlash } from "@phosphor-icons/react";

export interface InputFieldProps {
  type: string;
  error: boolean;
  label?: string; // Optional; Default to none.
  required: boolean;
  placeholder?: string;

  // set Field value
  setInput: (input: string) => void;
}

function InputField({
  type,
  error,
  label,
  required,
  placeholder,
  setInput,
}: InputFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  function checkLen(event: { preventDefault: () => void }) {
    event.preventDefault();
    if (inputRef.current) {
      if (inputRef.current.value.trim() === "" && required === true) {
        console.log("Required Input is empty");
      }
    }
  }

  return (
    <div className="w-full flex flex-col gap-y-2">
      {/* Label */}
      <div className="flex gap-x-2 font-display font-semibold">
        <label className="block text-light-500">{label}</label>
        {required && <span className="text-status-red-main">*</span>}
      </div>

      {/* Input */}
      <div className="relative">
        <input
          placeholder={placeholder}
          type={type === "password" && showPassword ? "text" : type}
          ref={inputRef}
          onSelect={checkLen}
          className={`bg-gray-100 rounded-lg w-full p-4`}
          onChange={(e) => setInput(e.target.value)}
        ></input>

        {type.toLowerCase() === "password" && !showPassword && (
          <Eye
            size={20}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer hover:text-primary-main transition duration-300 ease-in-out"
            onClick={() => setShowPassword(!showPassword)}
          />
        )}

        {/* Show password button */}
        {type.toLowerCase() === "password" && showPassword && (
          <EyeSlash
            size={20}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer hover:text-primary-main transition duration-300 ease-in-out"
            onClick={() => setShowPassword(!showPassword)}
          />
        )}
      </div>

      {/* Error */}
      {error && (
        <div className="flex items-center">
          <WarningCircle
            color="red"
            className="mr-1"
            size={"1.1em"}
          />
          <span className="text-status-red-main text-body-smfont-display">
            Error {type}{" "}
          </span>
        </div>
      )}
    </div>
  );
}

export default InputField;
