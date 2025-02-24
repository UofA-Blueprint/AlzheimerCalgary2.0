import MediaCard from "./MediaCard";
import { useState, useMemo, useCallback } from "react";
import { ImagePreviewModal } from "./ImagePreviewModal";
interface MediaGridProps {
	data: Media[];
	selectable: boolean;
	fullWidth: number;
}
interface FlattenedMedia extends Media {
	flatIndex: number;
  }
function splitIntoColumns(arr: FlattenedMedia[], nColumns: number = 3) {
    const result: FlattenedMedia[][] = [];

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
	const [previewIndex, setPreviewIndex] = useState<number | null>(null);
	const flattenedData = useMemo(() => data.map((item, index) => ({
		...item,
		flatIndex: index
	  })) as FlattenedMedia[], [data]);
	const dataTable = useMemo(() => {
		const columns = Math.ceil(fullWidth / 250);
		return splitIntoColumns(flattenedData, columns);
	}, [flattenedData, fullWidth]);

	const handleImageClick = useCallback((index: number) => {
		setPreviewIndex(index);
	}, []);

	
	  const handleClose = useCallback(() => {
		setPreviewIndex(null);
	  }, []);
	
	  const handleNext = useCallback(() => {
		setPreviewIndex(prev => 
		  prev !== null && prev < data.length - 1 ? prev + 1 : prev
		);
	  }, [data.length]);
	
	  const handlePrevious = useCallback(() => {
		setPreviewIndex(prev => 
		  prev !== null && prev > 0 ? prev - 1 : prev
		);
	  }, []);
	
	return (
		<>
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
									onImageClick={handleImageClick}
									index={item.flatIndex}
								/>
							))}
						</div>
						
					))
				}
			</div>
			{previewIndex !== null && (
				<ImagePreviewModal
				images={data}
				currentIndex={previewIndex}
				onClose={handleClose}
				onNext={handleNext}
				onPrevious={handlePrevious}
				/>
			)}
		</>
	);
}

export default MediaGrid;
