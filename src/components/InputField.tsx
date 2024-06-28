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
	setInput: React.Dispatch<React.SetStateAction<string>>;
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
	const [showError, setShowError] = useState<boolean>(false);

	function validateInput(event: { preventDefault: () => void }) {
		event.preventDefault();

		if (inputRef.current) {
			setInput(inputRef.current.value);
			if (inputRef.current.value.trim() === "" && required === true) {
				setShowError(true);
			}
			if (type === "email") {
				const email = inputRef.current.value.trim();
				const emailRegex =
					/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
				const valid = emailRegex.test(email);
				setShowError(!valid);
			} else if (type === "password") {
				const password = inputRef.current.value.trim();
				password.length < 6 ? setShowError(true) : setShowError(false);
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
					onClick={validateInput}
					className={`bg-gray-100 rounded-lg w-full p-4`}
					onChange={(e) => validateInput(e)}
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
			{showError && (
				<div className="flex items-center">
					<WarningCircle
						color="red"
						className="mr-1"
						size={"1.1em"}
					/>
					<span className="text-status-red-main text-body-smfont-display">
						Invalid {type}
					</span>
				</div>
			)}
		</div>
	);
}

export default InputField;
