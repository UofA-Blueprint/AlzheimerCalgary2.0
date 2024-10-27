import { Masonry } from "masonic";
import MediaCard from "./MediaCard";

interface Media {
	src: string;
	caption: string;
	id: number;
	date: Date;
}

interface MediaGridProps {
	data: Media[];
	sortOrder: string | null; // Sorting order as a prop
}

function MediaGrid({ data, sortOrder }: MediaGridProps) {
	// Sort data based on sortOrder
	const sortedData = sortOrder
		? [...data].sort((a, b) => {
				return sortOrder === "latest"
					? b.date.getTime() - a.date.getTime() // Descending for latest
					: a.date.getTime() - b.date.getTime(); // Ascending for oldest
		  })
		: data; // Use default order if sortOrder is null

	return (
		<div className="w-full h-full">
			<Masonry
				items={sortedData}
				render={MasonryItem}
				columnGutter={12}
				columnWidth={320}
				overscanBy={5}
			/>
		</div>
	);
}

interface MasonryItemProps {
	data: Media;
}

function MasonryItem({ data }: MasonryItemProps) {
	return <MediaCard {...data} />;
}

export default MediaGrid;
