import { twMerge } from "tailwind-merge";

//#region interfaces
interface ProfilePicturesProps {
	children: React.ReactNode;
	className?: string;
	backgroundColor?:
		| "tulip"
		| "gold"
		| "lime"
		| "jade"
		| "water"
		| "air"
		| "lilac"
		| "candy"
		| string;
}
//#endregion

const ProfilePictures = ({
	backgroundColor,
	className,
	children,
}: ProfilePicturesProps) => {
	return (
		<div
			className={twMerge(
				`object-cover rounded-full w-full h-full bg-profile-${backgroundColor}`,
				className,
			)}
		>
			{children}
		</div>
	);
};

export default ProfilePictures;
