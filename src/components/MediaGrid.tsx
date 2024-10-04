import { Masonry } from "masonic";
import MediaCard from "./MediaCard";

interface MediaGridProps {
	data: Media[];
}

function MediaGrid({ data }: MediaGridProps) {
	return (
		<Masonry
			items={data}
			render={MasonryItem}
			columnGutter={12}
			columnWidth={320}
			overscanBy={5}
		/>
	);
}

interface MasonryItemProps {
	data: Media;
}

function MasonryItem({ data }: MasonryItemProps) {
	return <MediaCard {...data} />;
}

export default MediaGrid;
