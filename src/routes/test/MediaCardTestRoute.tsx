import MediaCard from "@/components/MediaCard";

function MediaCardTestRoute() {
	return (
		<div className="bg-blue-200 min-h-screen flex justify-center items-center p-4">
			<div className="grid grid-cols-3 gap-4">
				<MediaCard
					src="https://images.unsplash.com/photo-1724579243894-6a8c9bbfe88c"
					title="Channeling their inner artist with a paintbrush and a splash of color!"
					id={1234}
					date={new Date("Oct 2, 2024")}
				/>
				<MediaCard
					src="https://images.unsplash.com/photo-1723984834599-5357b87f727c"
					title="Channeling their inner artist with a paintbrush and a splash of color!"
					id={1234}
					date={new Date("Oct 2, 2024")}
				/>
				<MediaCard
					src="https://images.unsplash.com/photo-1724505599369-2c1d43324fdc"
					title="Channeling their inner artist with a paintbrush and a splash of color!"
					id={1234}
					date={new Date("Oct 2, 2024")}
				/>
				<MediaCard
					src="https://images.unsplash.com/photo-1724579243894-6a8c9bbfe88c"
					title="Channeling their inner artist with a paintbrush and a splash of color!"
					id={1234}
					date={new Date("Oct 2, 2024")}
				/>
				<MediaCard
					src="https://images.unsplash.com/photo-1724505599369-2c1d43324fdc"
					title="Channeling their inner artist with a paintbrush and a splash of color!"
					id={1234}
					date={new Date("Oct 2, 2024")}
				/>
				<MediaCard
					src="https://images.unsplash.com/photo-1723984834599-5357b87f727c"
					title="Channeling their inner artist with a paintbrush and a splash of color!"
					id={1234}
					date={new Date("Oct 2, 2024")}
				/>
			</div>
		</div>
	);
}

export default MediaCardTestRoute;
