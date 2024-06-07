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
}

const IconOption = ({ icon, color, selected }: IconOptionProps) => {
	const body = "flex items-center justify-center w-16 h-16 rounded";

	const border = "outline outline-2 outline-primary-dark outline-offset-2";

	return (
		<div className={clsx(body, color, { [border]: selected })}>{icon}</div>
	);
};

export default IconOption;
