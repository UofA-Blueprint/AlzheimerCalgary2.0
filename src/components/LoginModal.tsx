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
	 * The email of the user.
	 */
	email: string;
	setEmail: React.Dispatch<React.SetStateAction<string>>;

	/**
	 * The password of the user.
	 */
	password?: string;
	setPassword?: React.Dispatch<React.SetStateAction<string>>;

	/**
	 * The passcode of the user.
	 */
	passcode?: Record<number, string>;
	setPasscode?: React.Dispatch<React.SetStateAction<Record<number, string>>>;

	/** */
	onClick: React.MouseEventHandler<HTMLButtonElement>;
}
//#endregion

/**
 * Represents the login modal component.
 * @param {string} title - The title of the login modal.
 * @param {string} className - Additional TailwindCSS.
 * @param {string} type - The type of the login modal.
 * @param {string} email - The email of the user.
 * @param {string} password - The password of the user.
 * @param {Record<number, string>} passcode - The passcode of the user.
 * @param {Function} setEmail - Set the email of the user.
 * @param {Function} setPassword - Set the password of the user.
 * @param {Function} setPasscode - Set the passcode of the user.
 * @returns
 */
const LoginModal = ({
	className,
	title,
	type,
	email,
	setEmail,
	password,
	setPassword,
	passcode,
	setPasscode,
	onClick,
}: LoginModalProps) => {
	const [validEmail, setValidEmail] = useState<boolean>(false);
	// const [passcode, setPasscode] = useState<Record<number, string>>({
	// 	0: "",
	// 	1: "",
	// 	2: "",
	// 	3: "",
	// 	4: "",
	// 	5: "",
	// });

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

			{/*Username field */}
			<InputField
				label={"Email"}
				error={true}
				required={true}
				placeholder={"Email"}
				type={"email"}
				setInput={setEmail}
			/>

			{/* Password field */}
			{type === "admin" ? (
				<InputField
					label={"Password"}
					error={true}
					required={true}
					placeholder={"Password"}
					type={"password"}
					setInput={setPassword!}
				/>
			) : (
				<InputCode
					input={passcode!}
					required={true}
					label={"Passcode"}
					setInput={setPasscode!}
				/>
			)}

			{/* Login Button */}
			<Button
				text="Login"
				disabled={
					email.length === 0 || password?.length === 0 ? true : false
				}
				onClick={onClick}
			/>
		</div>
	);
};

export { LoginModal };
