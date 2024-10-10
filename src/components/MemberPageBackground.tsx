import { useState } from "react";
import IconOption from "./IconOption";
import clsx from "clsx";
import { profileColors, ProfileColor } from "@/types/ProfileColor";

const MemberPageBackground = () => {
	const body = "flex flex-col w-full gap-2";

	const icons =
		"flex flex-row items-start justify-start flex-wrap gap-4 w-full";

	const header = "text-h4";

	const [selectedColor, setSelectedColor] = useState<ProfileColor | null>(
		null,
	);

	return (
		<div className={clsx(body)}>
			<h2 className={clsx(header)}>Member Page Background</h2>
			<div className={clsx(icons)}>
				{profileColors.map((color) => (
					<IconOption
						key={color}
						color={color}
						selected={selectedColor === color}
						setSelectedIcon={() => setSelectedColor(color)}
					/>
				))}
			</div>
		</div>
	);
};

export default MemberPageBackground;
