//#region Imports
import logoUrl from "@/assets/images/asc_logo.svg";
import { twMerge } from "tailwind-merge";
import React, { useState } from "react";

import Button from "./Button";
import InputField from "./InputField";
import { InputCode } from "./InputCode";
//#endregion

//#region Interface
interface LoginModalProps {
	/**
	 * Additional TailwindCSS classes.
	 */
	className?: string;

	/**
	 * The title of the login modal.
	 */
	title: string;

	/**
	 * The type of the login modal.
	 */
	type: "admin" | "member";

	/**
	 * Functions to set the email, last name, password, and passcode.
	 */
	onClick: React.MouseEventHandler<HTMLButtonElement>;
	setEmail?: React.Dispatch<React.SetStateAction<string>>;
	setLastName?: React.Dispatch<React.SetStateAction<string>>;
	setPassword?: React.Dispatch<React.SetStateAction<string>>;
	setPasscode?: React.Dispatch<React.SetStateAction<Record<number, string>>>;
}
//#endregion

/**
 * Represents the login modal component.
 */
const LoginModal = ({
	className,
	title,
	type,
	setEmail,
	setLastName,
	setPassword,
	setPasscode,
	onClick,
}: LoginModalProps) => {
	const [invalidUsername, setInvalidUsername] = useState<boolean>(true);
	const [invalidPassword, setInvalidPassword] = useState<boolean>(true);

	return (
		<div
			className={twMerge(
				"flex flex-col items-center justify-center gap-y-8 bg-white py-8 px-6 rounded-2xl shadow-lg w-[90%] sm:w-[70%] md:w-[50%] max-w-[30rem]",
				className,
			)}
		>
			{/* Logo  */}
			<img
				src={logoUrl}
				alt="ASC Logo"
			/>

			{/* Title */}
			<h1 className="text-h3 text-center font-display font-normal">
				{title}
			</h1>

			{/* Username field */}
			{type === "admin" ? (
				<InputField
					label={"Email"}
					error={invalidUsername}
					required={true}
					placeholder={"Email"}
					type={"email"}
					setError={setInvalidUsername}
					setInput={setEmail!}
				/>
			) : (
				<InputField
					label={"Member Last Name"}
					error={invalidUsername}
					required={true}
					placeholder={"Last Name"}
					type={"text"}
					setError={setInvalidUsername}
					setInput={setLastName!}
				/>
			)}

			{/* Password field */}
			{type === "admin" ? (
				<InputField
					label={"Password"}
					error={invalidPassword}
					required={true}
					placeholder={"Password"}
					type={"password"}
					setError={setInvalidPassword}
					setInput={setPassword!}
				/>
			) : (
				<InputCode
					error={invalidPassword}
					setError={setInvalidPassword}
					label={"Passcode"}
					required={true}
					setInput={setPasscode!}
				/>
			)}

			{/* Login Button */}
			<Button
				text="Login"
				size="medium"
				severity="primary"
				disabled={invalidUsername || invalidPassword}
				onClick={onClick}
			/>
		</div>
	);
};

export { LoginModal };
