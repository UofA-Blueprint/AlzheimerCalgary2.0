import MediaCard from "@/components/MediaCard";

function MediaCardTestRoute() {
	return (
		<div className="bg-blue-200 h-screen flex justify-center items-center">
			<div className="w-[360px]">
				<MediaCard
					src="https://images.unsplash.com/photo-1724579243894-6a8c9bbfe88c"
					title="Channeling their inner artist with a paintbrush and a splash of color!"
					id={1234}
					date={new Date("Oct 2, 2024")}
				/>
			</div>
		</div>
	);
}

export default MediaCardTestRoute;
