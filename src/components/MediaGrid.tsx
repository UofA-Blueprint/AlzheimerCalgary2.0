import MediaCard from "./MediaCard";
import { useMemo } from "react";

interface MediaGridProps {
	data: Media[];
	selectable: boolean;
	fullWidth: number;
}

function splitIntoColumns(arr: Media[], nColumns: number = 3) {
	const result: Media[][] = [];

	for (let i = 0; i < nColumns; ++i) {
		result.push([]);
	}


	if (nColumns > 0)
		for (let i = 0; i < arr.length; ++i) {
			result[i % nColumns].push(arr[i]);
		}

	return result;
}

function MediaGrid({ data, selectable, fullWidth }: MediaGridProps) {
	const dataTable = useMemo(
		() => splitIntoColumns(data, Math.ceil(fullWidth / 250)),
		[data, fullWidth],
	);

	return (
		<div className="w-full flex justify-between gap-4">
			{
				// Create a grid container with columns based on the width of the container
				// and render each item in the grid
				dataTable.map((column, i) => (
					<div
						key={i}
						className="flex flex-col max-w-[250px] gap-4 items-center"
					>
						{column.map((item, j) => (
							<MediaCard
								key={j}
								{...item}
								selectable={selectable}
							/>
						))}
					</div>
				))
			}
		</div>
	);
}

export default MediaGrid;
