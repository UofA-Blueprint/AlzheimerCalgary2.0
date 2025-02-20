//#region imports
import { twMerge } from "tailwind-merge";
import { useNavigate } from "react-router-dom";
import { UserCircle, Folder, ArrowsClockwise } from "@phosphor-icons/react";
import * as Icon from "@phosphor-icons/react";

import ProfilePictures from "./ProfilePictures";
//#endregion

//#region interfaces
interface MemberTableProps {
	className?: string;
	data: memberData[];

	isLoading: boolean;
	sortbyStorageUsed: () => void;
	sortbyLastUpdated: () => void;
}

export interface memberData {
	id: string;
	profilePicture: {
		type: "img" | "icon" | string;
		src: string;
		backgroundColor?: string;
	};
	name: string;
	lastName: string;
	passcode: string;
	storageUsed: string;
	lastUpdated: string;
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
 */
export function MemberTable({
	data,
	className,
	isLoading,
	sortbyStorageUsed,
	sortbyLastUpdated,
}: MemberTableProps) {
	const navigate = useNavigate();

	function handleClick(row: any) {
		navigate(`/admin/members/${row.id}`);
	}

	return (
		<div
			className={twMerge("rounded-lg w-full overflow-hidden", className)}
		>
			<table className="w-full bg-slate-50">
				{/* Headers */}
				<thead className="bg-primary-light text-white">
					<tr>
						<th
							scope="col"
							className="px-4 py-4 md:py-7"
						>
							<div className="flex items-center font-normal gap-x-2">
								<UserCircle size={22} />
								<span className="font-display text-sm md:text-base">
									Name
								</span>
							</div>
						</th>
						<th
							scope="col"
							className="px-4 py-4 md:py-7"
						>
							<button
								className="flex items-center font-normal gap-x-2"
								onClick={sortbyStorageUsed}
								disabled={isLoading}
							>
								<Folder size={22} />
								<span className="font-display text-sm md:text-base">
									Storage Used
								</span>
							</button>
						</th>
						<th
							scope="col"
							className="px-4 py-4 md:py-7"
						>
							<button
								className="flex items-center font-normal gap-x-2"
								onClick={sortbyLastUpdated}
								disabled={isLoading}
							>
								<ArrowsClockwise size={22} />
								<span className="font-display text-sm md:text-base">
									Last Updated
								</span>
							</button>
						</th>
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
								{Number(row.storageUsed).toFixed(3)} MB
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
