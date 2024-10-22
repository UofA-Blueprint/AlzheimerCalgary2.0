import React from "react";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";
import { ProfileColor } from "@/types/ProfileColor";

interface IconOptionProps {
	/** The phosphor icon to display in the option component */
	icon?: React.ReactNode;

	/** The background color of the option component */
	color: ProfileColor;

	/** Whether the option is selected or not */
	selected: boolean;

	/** The function to call when the option is clicked */
	setSelectedIcon: () => void;
}

const IconOption = ({
	icon,
	color,
	selected,
	setSelectedIcon,
}: IconOptionProps) => {
	const body =
		"flex items-center justify-center w-16 h-16 rounded cursor-pointer";

	const border = "border border-[1px] border-neutrals-dark-200";

	const transition = "transition transition-all duration-75 ease-in-out";

	const outline =
		"border-none outline outline-2 outline-primary-dark outline-offset-2";

	return (
		<div
			className={twMerge(
				clsx(body, color, border, transition, { [outline]: selected }),
			)}
			onClick={setSelectedIcon}
		>
			{icon}
		</div>
	);
};

export default IconOption;
