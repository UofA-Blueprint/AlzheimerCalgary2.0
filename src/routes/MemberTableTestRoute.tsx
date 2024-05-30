import { MemberTable } from "@/components/MemberTable";
import profilePic from "@/assets/images/face2.jpg";
import * as Icon from "@phosphor-icons/react";

export function MemberTableTestRoute() {
	const data = [
		{
			profilePicture: {
				type: "img",
				src: profilePic,
			},
			name: "John Doe",
			storageUsed: "1.5GB",
			lastUpdated: "12/20/2024",
		},
		{
			profilePicture: {
				type: "icon",
				src: "Tree",
				backgroundColor: "lime",
			},
			name: "Jane Doe",
			storageUsed: "2.5GB",
			lastUpdated: "12/11/2024",
		},
		{
			profilePicture: {
				type: "icon",
				src: "PawPrint",
				backgroundColor: "water",
			},
			name: "John Smith",
			storageUsed: "3.5GB",
			lastUpdated: "11/11/2024",
		},
	];
	return (
		<div className="w-full h-full">
			<MemberTable data={data} />
		</div>
	);
}
