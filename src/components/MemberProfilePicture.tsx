import { ReactNode, useState, useCallback } from "react";
import IconOption from "./IconOption";
import ColorPicker from "./ColorPicker";
import {
	PawPrint,
	Tree,
	Camera,
	Pizza,
	Atom,
	Binoculars,
	SoccerBall,
	Coffee,
} from "@phosphor-icons/react";
import clsx from "clsx";
import { ProfileColor } from "@/types/ProfileColor";

const MemberProfilePicture = () => {
	const body = "flex flex-col w-full gap-2";

	const controls = "flex flex-row items-start justify-between w-full";

	const icons =
		"flex flex-row items-start justify-start flex-wrap gap-4 w-full";

	const header = "text-h4";

	const [backgroundColor, setBackgroundColor] =
		useState<ProfileColor>("bg-profile-water");

	const [selectedIcon, setSelectedIcon] = useState<string | null>(null);

	const iconMap: Record<string, ReactNode> = {
		PawPrint: <PawPrint size={32} />,
		Tree: <Tree size={32} />,
		Camera: <Camera size={32} />,
		Pizza: <Pizza size={32} />,
		Atom: <Atom size={32} />,
		Binoculars: <Binoculars size={32} />,
		SoccerBall: <SoccerBall size={32} />,
		Coffee: <Coffee size={32} />,
	};

	const iconList = Object.keys(iconMap);

	return (
		<div className={clsx(body)}>
			<div className={clsx(controls)}>
				<h2 className={clsx(header)}>Member Profile Picture</h2>
				<ColorPicker
					backgroundColor={backgroundColor}
					setBackgroundColor={setBackgroundColor}
				/>
			</div>
			<div className={clsx(icons)}>
				{iconList.map((iconName) => (
					<IconOption
						key={iconName}
						icon={iconMap[iconName]}
						color={backgroundColor}
						selected={selectedIcon === iconName}
						setSelectedIcon={() => setSelectedIcon(iconName)}
					/>
				))}
			</div>
		</div>
	);
};

export default MemberProfilePicture;
