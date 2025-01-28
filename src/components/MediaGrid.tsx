import MediaCard from "./MediaCard";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";

interface Media {
	src: string;
	caption: string;
	id: number;
	date: Date;
}

interface MediaGridProps {
	data: Media[];
	selectable: boolean;
	fullWidth: number;
}

function splitIntoColumns(arr: Media[], nColumns: number) {
	const columnSize = Math.floor(arr.length / nColumns); // Size of each column
	const result: Media[][] = [];
	for (let i = 0; i < nColumns; i++) {
		result.push(arr.slice(i * columnSize, (i + 1) * columnSize));
	}

	return result;
}

function MediaGrid({ data, selectable, fullWidth, ...props }: MediaGridProps) {
	const dataTable = useMemo(
		() => splitIntoColumns(data, Math.floor(fullWidth / 256)),
		[data, fullWidth],
	);

	return (
		<div className="w-full grid grid-cols-4 grid-rows-auto gap-4  overflow-y-scroll">
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
				// data.map((item, i) => (
				// 	<MediaCard
				// 		key={i}
				// 		{...item}
				// 	/>
				// ))
			}
		</div>
	);
}

export default MediaGrid;
