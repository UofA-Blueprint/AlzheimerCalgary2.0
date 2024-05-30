//#region imports
import { UserCircle, Folder, ArrowsClockwise } from "@phosphor-icons/react";
import ProfilePictures from "./ProfilePictures";
import * as Icon from "@phosphor-icons/react";
//#endregion

//#region interfaces
interface MemberTableProps {
	data: {
		profilePicture: {
			type: "img" | "icon" | string;
			src: string;
			backgroundColor?: string;
		};
		name: string;
		storageUsed: string;
		lastUpdated: string;
	}[];
}
//#endregion

//#region helpers
function selectIcon(type: string) {
	const iconStyling =
		"w-full h-full rounded-full p-2 object-cover text-white";
	switch (type) {
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

/**
 * Represents a table component that displays member data.
 * @param data - An array of objects representing each member's data.
 */
export function MemberTable({ data }: MemberTableProps) {
	const headers = [
		{ icon: <UserCircle />, label: "Name" },
		{ icon: <Folder />, label: "Storage Used" },
		{ icon: <ArrowsClockwise />, label: "Last Updated" },
	];

	function handleClick(row: any) {
		alert(`Clicked ${row.name}`);
	}

	return (
		<div className="rounded-lg w-full overflow-hidden">
			<table className="w-full">
				{/* Headers */}
				<thead className="bg-primary-light text-white">
					<tr>
						{headers.map((header, index) => (
							<th
								scope="col"
								key={index}
								className="px-4 py-4 md:py-7"
							>
								<div className="flex items-center font-normal gap-x-2">
									<span className=" text-xl">
										{header.icon}
									</span>
									<span className="font-display text-sm md:text-base">
										{header.label}
									</span>
								</div>
							</th>
						))}
					</tr>
				</thead>

				{/* Data */}
				<tbody>
					{data.map((row, index) => (
						<tr
							key={index}
							className="cursor-pointer hover:bg-status-blue-light"
							onClick={() => handleClick(row)}
						>
							<td className="px-4 py-6">
								<div className="flex items-center gap-x-6">
									<ProfilePictures
										className="w-12 md:w-16 aspect-square"
										backgroundColor={
											row.profilePicture.backgroundColor
										}
									>
										{row.profilePicture.type === "img" ? (
											<img
												src={row.profilePicture.src}
												alt="profile"
												className="w-full h-full rounded-full object-cover"
											/>
										) : (
											selectIcon(
												row.profilePicture
													.src as string,
											)
										)}
									</ProfilePictures>
									<span className="font-display text-sm md:text-base">
										{row.name}
									</span>
								</div>
							</td>
							<td className="px-4 py-6 font-display text-sm md:text-base">
								{row.storageUsed}
							</td>
							<td className="px-4 py-6 font-display text-sm md:text-base">
								{row.lastUpdated}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
