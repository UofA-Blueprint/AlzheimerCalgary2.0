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
	const columnSize = Math.ceil(arr.length / nColumns); // Size of each column
	const result: Media[][] = [];
	for (let i = 0; i < nColumns; i++) {
		result.push(arr.slice(i * columnSize, (i + 1) * columnSize));
	}

	return result;
}

function MediaGrid({ data, selectable, fullWidth, ...props }: MediaGridProps) {
	const dataTable = useMemo(() => splitIntoColumns(data, 4), [data]);
	return (
		<div className="w-full h-[80vh] flex gap-8">
			{
				// Create a grid container with columns based on the width of the container
				// and render each item in the grid
				dataTable.map((column, i) => (
					<div
						key={i}
						className="grid grid-cols-1 gap-4"
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
