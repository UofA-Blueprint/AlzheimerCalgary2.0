//#region Imports
import { twMerge } from "tailwind-merge";
import { useRef, useState, useEffect } from "react";
import { WarningCircle } from "@phosphor-icons/react";
//#endregion

//#region Interfaces
interface InputCodeProps {
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

	error: boolean;
	className?: string;

	// set Field value
	setError: React.Dispatch<React.SetStateAction<boolean>>;
	setInput: React.Dispatch<React.SetStateAction<Record<number, string>>>;
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
	label = "",
	required,
	error,
	className,
	setError,
	setInput,
}: InputCodeProps): JSX.Element {
	const inputRefs = Array.from({ length: 6 }, () =>
		useRef<HTMLInputElement>(null),
	);

	const [value, setValue] = useState<string>("");
	const [showError, setShowError] = useState<boolean>(false);

	//#region Functions
	/**
	 * This function handles inputs based on the selected key.
	 * @param {React.KeyboardEvent<HTMLInputElement>} e - The keyboard event.
	 * @param {number} index - The index of the input field.
	 */
	const handleKeyDown = (
		e: React.KeyboardEvent<HTMLInputElement>,
		index: number,
	) => {
		setValue(e.key.toString());

		// Erase the value of the current input field when the backspace key is pressed
		if (e.key === "Backspace") {
			if (inputRefs[index]?.current?.value === "" && index > 0)
				inputRefs[index - 1]?.current?.focus();
			setValue("");
		}

		// Enter the value of the current input
		else {
			if (index <= 5 && value != "") {
				// inputRefs[index + 1]?.current?.focus();
				inputRefs[index + 1]?.current?.select();
			}
		}
	};

	/**
	 * This function checks if there is an error in the input field.
	 * @returns None
	 */
	const checkError = (index: number) => {
		setShowError(true);
		inputRefs[index]?.current?.focus();

		inputRefs.forEach((input) => {
			if (input.current?.value == "") {
				setError(true);
			} else {
				setError(false);
			}
		});
	};

	/**
	 * This function handles the change event of the input field.
	 * @param {React.ChangeEvent<HTMLInputElement>} e - The change event.
	 * @returns None
	 */
	const handleInputChange = (index: number) => {
		checkError(index);
		setInput({
			0: inputRefs[0]?.current?.value || "",
			1: inputRefs[1]?.current?.value || "",
			2: inputRefs[2]?.current?.value || "",
			3: inputRefs[3]?.current?.value || "",
			4: inputRefs[4]?.current?.value || "",
			5: inputRefs[5]?.current?.value || "",
		});
	};
	//#endregion

	return (
		<div
			className={twMerge(
				"flex flex-col gap-y-2 md:gap-y-3 text-neutrals-dark-500 text-body-reg w-full",
				className,
			)}
		>
			{/* Title section */}
			<div className="flex gap-x-1 items-center font-display font-semibold">
				<p className="text-base capitalize">{label}</p>
				{required && <p className="text-status-red-main">*</p>}
			</div>

			{/* Input Code Section */}
			<div className="flex gap-x-2 w-full">
				{[0, 1, 2, 3, 4, 5].map((_, index) => (
					<input
						key={index}
						ref={inputRefs[index]}
						type="text"
						maxLength={1}
						className={`h-14 w-1/6 md:h-16 text-center text-2xl md:text-3xl rounded-md bg-neutrals-light-300 border-2 border-status-red-main font-display ${
							error && showError
								? "border-status-red-main"
								: "border-none"
						}`}
						onClick={() => checkError(index)}
						onChange={(e) => handleInputChange(index)}
						onKeyDown={(e) => handleKeyDown(e, index)}
					/>
				))}
			</div>

			{/* Error Message */}
			{showError && error && (
				<div className="flex text-body-sm items-center gap-x-1 text-status-red-main font-display">
					<WarningCircle size={20} />
					<p>Error passcode</p>
				</div>
			)}
		</div>
	);
}
