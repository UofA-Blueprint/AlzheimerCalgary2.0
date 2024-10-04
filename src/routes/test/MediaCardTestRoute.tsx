import MediaCard from "@/components/MediaCard";
import { ToastContainer } from "react-toastify";

const getMeta = (
	url: string,
	cb: (error: string | Event | null, img?: HTMLImageElement | null) => void,
) => {
	const img = new Image();
	img.onload = () => cb(null, img);
	img.onerror = (err) => cb(err);
	img.src = url;
};

function MediaCardTestRoute() {
	getMeta(
		"https://images.unsplash.com/photo-1724579243894-6a8c9bbfe88c",
		(err, img) => {
			console.log(img?.naturalWidth, img?.naturalHeight);
		},
	);
	return (
		<div className="bg-blue-200 min-h-screen flex justify-center items-center p-4">
			<ToastContainer
				position="bottom-right"
				autoClose={2000}
				newestOnTop={true}
				closeButton={false}
				hideProgressBar={true}
			/>
			<div className="grid grid-flow-row grid-cols-4 gap-8 md:gap-12 lg:gap-16">
				<MediaCard
					src="https://images.unsplash.com/photo-1724579243894-6a8c9bbfe88c"
					caption="Channeling their inner artist with a paintbrush and a splash of color!"
					id={1234}
					date={new Date("Oct 2, 2024")}
					selectable
				/>
				<MediaCard
					src="https://images.unsplash.com/photo-1723984834599-5357b87f727c"
					caption="Channeling their inner artist with a paintbrush and a splash of color!"
					id={1234}
					date={new Date("Oct 2, 2024")}
				/>
				<MediaCard
					src="https://images.unsplash.com/photo-1724505599369-2c1d43324fdc"
					caption="Channeling their inner artist with a paintbrush and a splash of color!"
					id={1234}
					date={new Date("Oct 2, 2024")}
				/>
				<MediaCard
					src="https://images.unsplash.com/photo-1724579243894-6a8c9bbfe88c"
					caption="Channeling their inner artist with a paintbrush and a splash of color!"
					id={1234}
					date={new Date("Oct 2, 2024")}
				/>
				<MediaCard
					src="https://images.unsplash.com/photo-1724505599369-2c1d43324fdc"
					caption="Channeling their inner artist with a paintbrush and a splash of color!"
					id={1234}
					date={new Date("Oct 2, 2024")}
				/>
				<MediaCard
					src="https://images.unsplash.com/photo-1723984834599-5357b87f727c"
					caption="Channeling their inner artist with a paintbrush and a splash of color!"
					id={1234}
					date={new Date("Oct 2, 2024")}
				/>
			</div>
		</div>
	);
}

export default MediaCardTestRoute;
