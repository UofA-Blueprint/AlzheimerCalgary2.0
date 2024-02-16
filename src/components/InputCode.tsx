//#region Imports
import { twMerge } from "tailwind-merge";
import { useRef, useState } from "react";
//#endregion

//#region Interfaces
interface InputCodeProps {
  /**
   * Indicates whether the input field has an error.
   * If true, a red border and small information will be displayed.
   */
  error: boolean;

  /**
   * The label of the input field.
   * Defaults to an empty string if not provided.
   */
  label?: string;

  /**
   * Indicates whether the input field is required.
   * If true, an asterisk will be displayed after the label,
   * and the text length will be checked to ensure it is not 0.
   */
  required: boolean;
  className?: string;
}
//#endregion

export function InputCode({
  error,
  label,
  required,
  className,
}: InputCodeProps): JSX.Element {
  const inputRefs = Array.from({ length: 6 }, () =>
    useRef<HTMLInputElement | null>(null)
  );
  const [input, setInput] = useState<Record<number, string>>({
    0: "",
    1: "",
    2: "",
    3: "",
    4: "",
    5: "",
  });
  const [value, setValue] = useState<string>("");

  //#region Functions
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && index > 0 && value.length === 0) {
      setInput((prev) => ({ ...prev, [index]: "" }));
      inputRefs[index - 1]?.current?.focus();
    } else if (e.key !== "Backspace" && index < 5 && value.length > 0) {
      setInput((prev) => ({ ...prev, [index]: value }));
      inputRefs[index + 1]?.current?.focus();
    }
  };
  //#endregion
  return (
    <div
      className={twMerge(
        "flex flex-col gap-y-1 text-neutrals-dark-500 text-body-reg",
        className
      )}
    >
      {/* Title section */}
      <div className="flex gap-x-1">
        <p className="text-base capitalize">Input Text</p>
        <p className="text-status-red-main">*</p>
      </div>

      {/* Input Code Section */}
      <div className="flex gap-x-2">
        {[1, 2, 3, 4, 5, 6].map((_, index) => (
          <input
            key={index}
            ref={inputRefs[index]}
            type="text"
            maxLength={1}
            className="w-12 h-16 text-center text-3xl rounded-md bg-neutrals-light-300"
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => handleKeyDown(e, index)}
          />
        ))}
      </div>

      {/* Error Message */}
      <div className="flex text-body-sm items-center gap-x-1 text-status-red-main">
        <img
          src="src/assets/images/error.svg"
          alt="Error icon"
          className="w-5"
        />
        <p>Error passcode</p>
      </div>
    </div>
  );
}
