import MediaCard from "./MediaCard";
import { useMemo } from "react";

interface MediaGridProps {
	data: Media[];
	selectable: boolean;
	fullWidth: number;
}

function splitIntoColumns(arr: Media[], nColumns: number) {
	const result: Media[][] = [];

	for (let i = 0; i < nColumns; ++i) {
		result.push([]);
	}

	for (let i = 0; i < arr.length; ++i) {
		result[i % 3].push(arr[i]);
	}

	return result;
}

function MediaGrid({ data, selectable, fullWidth }: MediaGridProps) {
	const dataTable = useMemo(
		() => splitIntoColumns(data, Math.floor(fullWidth / 256)),
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
						className="flex flex-col gap-4 items-center"
					>
						{column.map((item, j) => (
							<MediaCard
								key={j}
								{...item}
							/>
						))}
					</div>
				))
			}
		</div>
	);
}

export default MediaGrid;
