import { useRef } from "react";
import { twMerge } from "tailwind-merge";
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
	icon?: React.ElementType;
	text?: string;
	rounded?: boolean;
	fill?: boolean;
	disabled: boolean;
	fontSize?: string;
	color?: string;
}

const Button: React.FC<ButtonProps> = ({
	text = null,
	icon: Icon = null,
	onClick,
	rounded = false,
	fill = true,
	disabled,
	fontSize = "1em",
	className = null,
}) => {
	const buttonRef = useRef<HTMLButtonElement>(null);
	const buttonClassName = twMerge(
		`flex flex-row items-center justify-center p-4 ${
			disabled === true
				? "bg-neutrals-light-200 text-gray-400 cursor-default"
				: fill
				? "relative overflow-hidden bg-primary-main text-white z-10 active:bg-primary-main active:text-white transition-colors hover:bg-neutrals-light-100 hover:text-primary-main border-2 border-primary-main hover:border-primary-main rounded-full w-full h-full before:absolute before:right-0 before:top-0 before:w-full before:h-full before:z-0 before:bg-primary-main before:content[''] before:transition-transform before:duration-300 hover:before:transform hover:before:translate-x-full"
				: "relative overflow-hidden text-primary-dark border-primary-dark border-2 active:bg-white active:text-primary-dark transition-colors before:absolute before:left-0 before:top-0 before:-z-10 before:h-full before:w-full before:origin-top-left before:scale-x-0 before:bg-primary-dark before:transition-transform before:duration-300 before:content-[''] hover:text-white before:hover:scale-x-100"
		} ${rounded ? "rounded-full" : "rounded-lg"} w-full h-full`,
		className,
		// change color --> change text-{color}, border-{color} and active:bg-{color}, active:text-{color}, before:bg-{color}
	);

	return (
		<button
			ref={buttonRef}
			style={{ fontSize: fontSize }}
			onClick={onClick}
			className={buttonClassName}
			disabled={disabled}
		>
			{Icon && !text && (
				<div className="relative z-20">
					<Icon />
				</div>
			)}
			{Icon && text && (
				<>
					<div className="relative z-20">
						<Icon className="mt-0.2" />
					</div>
					<span className="relative z-20 pl-1">{text}</span>
				</>
			)}
			{!Icon && text && <span className="relative z-20">{text}</span>}
		</button>
	);
};

export default Button;
