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
		const currentInput = inputRefs[index]?.current;
		if (!currentInput) return;
	
		if (e.ctrlKey && e.key.toLowerCase() === 'v') {
			return;
		}
		
		if (e.key === "Backspace") {
			if (currentInput.value === "" && index > 0) {
				const prevInput = inputRefs[index - 1]?.current;
				if (prevInput) {
					prevInput.focus();
					prevInput.select();
				}
			}
		} else if (/^[A-Za-z0-9]$/.test(e.key)) {
			e.preventDefault(); 
			currentInput.value = e.key.toUpperCase();
			updateInputStates();
			const nextInput = inputRefs[index + 1]?.current;
			if (index < 5) {
				if (nextInput) {
					nextInput.focus();
					nextInput.select();
				}
			}
		}
	};

	//#region Functions
	/**
	 * This function handle paste logic lol
	 * @returns None
	 */
	const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>, index: number) => {
		e.preventDefault();
		const pastedData = e.clipboardData.getData('text').toUpperCase();
		// console.log("Pasted data:", pastedData); // Debug log
		
		// clean  data
		const cleanedChars = pastedData.replace(/[^A-Z0-9]/g, '').slice(0, 6);
		// console.log("Cleaned chars:", cleanedChars); // Debug log
		
		// Start filling from the first box
		for (let i = 0; i < cleanedChars.length && i < 6; i++) {
			const targetInput = inputRefs[i].current;
			if (targetInput) {
				targetInput.value = cleanedChars[i];
			}
		}
	
		// Update all states at once after filling
		updateInputStates();
	
		// Focus on next empty input or last filled input
		const lastIndex = Math.min(cleanedChars.length, 5);
		inputRefs[lastIndex]?.current?.focus();
		inputRefs[lastIndex]?.current?.select();
	};
	/**
	 * This function checks if there is an error in the input field.
	 * @returns None
	 */
    const checkError = (index: number) => {
        setShowError(true);
        inputRefs[index]?.current?.focus();
        inputRefs[index]?.current?.select();
        updateInputStates();
    };

    const updateInputStates = () => {
        const newInputs: Record<number, string> = {};
        let hasEmpty = false;

        inputRefs.forEach((ref, idx) => {
            const value = ref.current?.value.toUpperCase() || "";
            newInputs[idx] = value;
            if (!value) hasEmpty = true;
        });

        setInput(newInputs);
        setError(hasEmpty);
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
						className={`uppercase h-14 w-1/6 md:h-16 text-center text-2xl md:text-3xl rounded-md bg-neutrals-light-300 border-2 border-status-red-main font-display ${
							error && showError
								? "border-status-red-main"
								: "border-none"
						}`}
						onClick={() => checkError(index)}
						onKeyDown={(e) => handleKeyDown(e, index)}
						onPaste={(e) => handlePaste(e, index)}
						onChange={(e) => {
							if (e.target.value) {
								e.target.value = e.target.value.toUpperCase();
								updateInputStates();
							}
							handleInputChange(index);
						}}
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
