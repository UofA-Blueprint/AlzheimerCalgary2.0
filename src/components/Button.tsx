import { useRef } from "react";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	/* Height of the button */
	size: "small" | "medium" | "large";

	/* Special button shapes */
	shape?: "round" | "square";

	/* The text to display on the button */
	text?: string;

	/* 32x32 Phosphor icon to display on the button */
	icon?: React.ReactNode;

	/* Whether the button is disabled */
	disabled?: boolean;

	/* The severity of the button */
	severity?: "primary" | "secondary" | "danger" | "dangerPrimary";

	/* The callback to run when the button is clicked */
	onClick?: React.MouseEventHandler<HTMLButtonElement>;

	title?: string;
}

function Button({
	shape,
	text,
	icon,
	disabled = false,
	severity = "primary",
	onClick,
	title,
}: ButtonProps) {
	const buttonRef = useRef<HTMLButtonElement>(null);

	// Button styles
	const base =
		"flex flex-row items-center justify-center w-full h-full cursor-pointer rounded-lg gap-2 p-2 lg:p-4 xl:p-6 text-sm lg:text-base xl:text-xl xl:leading-6";

	// const small = "h-8 py-1 px-6 gap-1 text-sm";

	// const medium = "h-12 py-3 px-6 text-base";

	// const large = "h-16 py-4 px-6 text-2xl leading-6";

	// const round = clsx("rounded-full p-4", {
	// 	"w-[60px] h-[60px]": size === "large",
	// 	"w-[48px] h-[48px]": size === "medium",
	// 	"w-[32px] h-[32px]": size === "small",
	// });

	// const square = clsx("p-4", {
	// 	"w-[60px] h-[60px]": size === "large",
	// 	"w-[48px] h-[48px]": size === "medium",
	// 	"w-[32px] h-[32px]": size === "small",
	// });

	const primary = "bg-primary-main text-neutrals-light-100 border-2 border-primary-main";

	const secondary =
		"bg-transparent text-primary-dark border-2 border-primary-dark ";

	const danger =
		"bg-transparent text-status-red-main border-2 border-status-red-main";

	const dangerPrimary = "bg-status-red-main text-neutrals-light-100";

	const disabledButton =
		"bg-neutrals-light-500 text-neutrals-dark-200 border-transparent cursor-not-allowed";

	const textStyle = "text-center min-w-max";

	const square = "w-12 h-12 aspect-square"

	return (
		<button
			ref={buttonRef}
			disabled={disabled}
			className={twMerge(
				clsx(base, {
					// [small]: size === "small",
					// [medium]: size === "medium",
					// [large]: size === "large",
					// [round]: shape === "round",
					[square]: shape === "square",
					[primary]: severity === "primary",
					[secondary]: severity === "secondary",
					[danger]: severity === "danger",
					[dangerPrimary]: severity === "dangerPrimary",
					[disabledButton]: disabled,
				}),
			)}
			onClick={onClick}
			type="button"
			title={title}
		>
			<span>{icon}</span>
			{text && !shape && <span className={clsx(textStyle)}>{text}</span>}
		</button>
	);
}

export default Button;
