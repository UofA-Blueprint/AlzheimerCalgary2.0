//#region Imports
import { twMerge } from "tailwind-merge";
import { useRef, useState } from "react";
import { WarningCircle } from "@phosphor-icons/react";
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

/**
 * Renders an input code field component.
 *
 * @component
 * @param {object} props - The component props.
 * @param {boolean} props.error - Indicates whether the input field has an error.
 * @param {string} props.label - The label of the input field. Defaults to an empty string if not provided.
 * @param {boolean} props.required - Indicates whether the input field is required.
 * @param {string} props.className - Additional CSS class name for the component.
 * @returns {JSX.Element} The rendered input code component.
 */
export function InputCode({
  error,
  label = "",
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
  /**
   * This function handles inputs based on the selected key.
   * @param {React.KeyboardEvent<HTMLInputElement>} e - The keyboard event.
   * @param {number} index - The index of the input field.
   */
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && index > 0) {
      inputRefs[index]?.current?.value === ""
        ? inputRefs[index - 1]?.current?.focus()
        : setInput((prev) => ({ ...prev, [index]: "" }));
    } else if (e.key === "Tab" && index > 0) {
      setInput((prev) => ({ ...prev, [index]: value }));
      setValue("");
    } else if (index < 5 && value !== "") {
      setInput((prev) => ({ ...prev, [index]: value }));
      inputRefs[index + 1]?.current?.focus();
      setValue("");
    }
  };
  //#endregion

  return (
    <div
      className={twMerge(
        "flex flex-col gap-y-2 md:gap-y-3 text-neutrals-dark-500 text-body-reg",
        className
      )}
    >
      {/* Title section */}
      <div className="flex gap-x-1 items-center">
        <p className="text-base capitalize">{label}</p>
        {required && <p className="text-status-red-main">*</p>}
      </div>

      {/* Input Code Section */}
      <div className="flex gap-x-2">
        {[0, 1, 2, 3, 4, 5].map((_, index) => (
          <input
            key={index}
            ref={inputRefs[index]}
            type="text"
            maxLength={1}
            className={`w-10 h-14 md:w-12 md:h-16 text-center text-2xl md:text-3xl rounded-md bg-neutrals-light-300 border-2 border-status-red-main ${
              error ? "border-status-red-main" : "border-none"
            }`}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => handleKeyDown(e, index)}
          />
        ))}
      </div>

      {/* Error Message */}
      {error && (
        <div className="flex text-body-sm items-center gap-x-1 text-status-red-main">
          <WarningCircle size={20} />
          <p>Error passcode</p>
        </div>
      )}
    </div>
  );
}
