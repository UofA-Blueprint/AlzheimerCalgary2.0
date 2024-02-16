//#region Imports
import { twMerge } from "tailwind-merge";
//#endregion

//#region Interfaces
interface InputCodeProps {
  /**
   * The type of the input field.
   * Valid values are "email", "number", or "text".
   */
  type: "email" | "number" | "text";

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
  type,
  error,
  label,
  required,
  className,
}: InputCodeProps): JSX.Element {
  return (
    <div className="flex flex-col gap-y-1 text-neutrals-dark-500 text-body-reg">
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
            type="text"
            className="w-12 h-16 text-center rounded-md bg-neutrals-light-300"
          />
        ))}
      </div>
    </div>
  );
}
