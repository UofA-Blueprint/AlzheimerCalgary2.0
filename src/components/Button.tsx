import { ReactNode, useRef } from "react";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	/* Height of the button */
	shape: "small" | "medium" | "large" | "round" | "square";

	/* The text to display on the button */
	text?: string;

	/* 32x32 Phosphor icon to display on the button */
	icon?: React.ReactNode;

	/* Whether the button is disabled */
	disabled?: boolean;

	/* The severity of the button */
	severity?: "primary" | "secondary" | "danger";

	/* The callback to run when the button is clicked */
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

function Button({
	shape,
	text,
	icon,
	disabled = false,
	severity = "primary",
	onClick,
}: ButtonProps) {
	const buttonRef = useRef<HTMLButtonElement>(null);

	// Button styles
	const base =
		"flex flex-row items-center justify-center cursor-pointer w-full rounded-lg gap-2";

	const small = "h-8 py-1 px-6 gap-1 text-sm";

	const medium = "h-12 py-3 px-6 text-base";

	const large = "h-16 py-4 px-6 text-2xl";

	const round = " h-[60px] w-[60px] rounded-full p-4";

	const square = "h-[60px] w-[60px] p-4";

	const primary = "bg-primary-main text-neutrals-light-100";

	const secondary =
		"bg-transparent text-primary-dark border-2 border-primary-dark ";

	const danger =
		"bg-transparent text-status-red-main border-2 border-status-red-main";

	const disabledButton =
		"bg-neutrals-light-500 text-neutrals-dark-200 border-transparent cursor-not-allowed";

	const textStyle = "text-body-reg text-center min-w-max";

	return (
		<button
			ref={buttonRef}
			disabled={disabled}
			className={twMerge(
				clsx(base, {
					[small]: shape === "small",
					[medium]: shape === "medium",
					[large]: shape === "large",
					[round]: shape === "round",
					[square]: shape === "square",
					[primary]: severity === "primary",
					[secondary]: severity === "secondary",
					[danger]: severity === "danger",
					[disabledButton]: disabled,
				}),
			)}
			onClick={onClick}
		>
			<span>{icon}</span>
			<span className={clsx(textStyle)}>{text}</span>
		</button>
	);
}

export default Button;
