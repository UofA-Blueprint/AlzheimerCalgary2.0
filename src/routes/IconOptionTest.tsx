import React from "react";
import IconOption from "@/components/IconOption";
import { Pizza, Camera, Atom, Binoculars } from "@phosphor-icons/react";

const IconOptionTest = () => {
	return (
		<div className="fixed inset-0 flex flex-col gap-6 items-center justify-center">
			<IconOption
				icon={<Pizza size={32} />}
				color="bg-profile-candy"
				selected={true}
			/>

			<IconOption
				icon={<Camera size={32} />}
				color="bg-profile-lilac"
				selected={false}
			/>
			<IconOption
				icon={<Atom size={32} />}
				color="bg-profile-water"
				selected={false}
			/>
			<IconOption
				icon={<Binoculars size={32} />}
				color="bg-profile-lime"
				selected={false}
			/>
		</div>
	);
};

export default IconOptionTest;
