//# region Imports
import ProfilePictures from "./ProfilePictures";
import { twMerge } from "tailwind-merge";
import * as Icon from "@phosphor-icons/react";
//#endregion

//#region Interfaces
interface MemberHeaderProp {
	profilePicture: {
		type: "img" | "icon" | string;
		src: string;
		backgroundColor?: string;
	};

	username: string;

	// Optional
	usernameExtra?: string; // Additional CSS classes for the username
	className?: string; // Additional CSS classes for the component
}
//#endregion

//#region helpers
function selectIcon(src: string) {
	const iconStyling =
		"w-full h-full rounded-full p-2 object-cover text-white";
	switch (src) {
		case "PawPrint":
			return <Icon.PawPrint className={iconStyling} />;
		case "Tree":
			return <Icon.Tree className={iconStyling} />;
		case "Pizza":
			return <Icon.Pizza className={iconStyling} />;
		case "Camera":
			return <Icon.Camera className={iconStyling} />;
		case "Atom":
			return <Icon.Atom className={iconStyling} />;
		case "Binoculars":
			return <Icon.Binoculars className={iconStyling} />;
		case "SoccerBall":
			return <Icon.SoccerBall className={iconStyling} />;
		case "Coffee":
			return <Icon.Coffee className={iconStyling} />;
	}
}
//#endregion

function MemberHeader({
	profilePicture,
	username,
	usernameExtra,
	className,
}: MemberHeaderProp) {
	return (
		<div
			className={twMerge(
				"flex flex-col lg:flex-row items-center w-full",
				className,
			)}
		>
			{/* Profile Picture */}
			<ProfilePictures
				className="w-32 xl:w-44 aspect-square"
				backgroundColor={profilePicture?.backgroundColor}
			>
				{profilePicture?.type === "img" ? (
					<img
						src={profilePicture?.src}
						alt="profile"
						className="w-full h-full rounded-full object-cover"
					/>
				) : (
					selectIcon(profilePicture?.src as string)
				)}
			</ProfilePictures>

			{/* Username */}
			<div
				className={twMerge(
					"font-bold justify-center pt-4 md:pl-8 lg:pt-0 md:justify-start flex whitespace-nowrap font-display",
					usernameExtra,
				)}
			>
				<h1>{username}</h1>
			</div>
		</div>
	);
}

export default MemberHeader;
