import React from "react";
import clsx from "clsx";
import ProfileColor from "@/types/ProfileColor";

interface IconOptionProps {
	/** The phosphor icon to display in the option component */
	icon: React.ReactNode;

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

	const border = "outline outline-2 outline-primary-dark outline-offset-2";

	return (
		<div
			className={clsx(body, color, { [border]: selected })}
			onClick={setSelectedIcon}
		>
			{icon}
		</div>
	);
};

export default IconOption;
