import MediaGrid from "@/components/MediaGrid";
import { ToastContainer } from "react-toastify";

const data = [
	{
		src: "https://images.unsplash.com/photo-1724579243894-6a8c9bbfe88c",
		caption:
			"Channeling their inner artist with a paintbrush and a splash of color!",
		id: 1234,
		date: new Date("Oct 2, 2024"),
	},
	{
		src: "https://images.unsplash.com/photo-1723984834599-5357b87f727c",
		caption:
			"Channeling their inner artist with a paintbrush and a splash of color!",
		id: 1235,
		date: new Date("Oct 2, 2024"),
	},
	{
		src: "https://images.unsplash.com/photo-1724505599369-2c1d43324fdc",
		caption:
			"Channeling their inner artist with a paintbrush and a splash of color!",
		id: 1236,
		date: new Date("Oct 2, 2024"),
	},
	{
		src: "https://images.unsplash.com/photo-1724579243894-6a8c9bbfe88c",
		caption:
			"Channeling their inner artist with a paintbrush and a splash of color!",
		id: 1237,
		date: new Date("Oct 2, 2024"),
	},
	{
		src: "https://images.unsplash.com/photo-1723984834599-5357b87f727c",
		caption:
			"Channeling their inner artist with a paintbrush and a splash of color!",
		id: 1238,
		date: new Date("Oct 2, 2024"),
	},
	{
		src: "https://images.unsplash.com/photo-1724505599369-2c1d43324fdc",
		caption:
			"Channeling their inner artist with a paintbrush and a splash of color!",
		id: 1239,
		date: new Date("Oct 2, 2024"),
	},
	{
		src: "https://images.unsplash.com/photo-1724579243894-6a8c9bbfe88c",
		caption:
			"Channeling their inner artist with a paintbrush and a splash of color!",
		id: 1240,
		date: new Date("Oct 2, 2024"),
	},
	{
		src: "https://images.unsplash.com/photo-1723984834599-5357b87f727c",
		caption:
			"Channeling their inner artist with a paintbrush and a splash of color!",
		id: 1241,
		date: new Date("Oct 2, 2024"),
	},
	{
		src: "https://images.unsplash.com/photo-1724505599369-2c1d43324fdc",
		caption:
			"Channeling their inner artist with a paintbrush and a splash of color!",
		id: 1242,
		date: new Date("Oct 2, 2024"),
	},
	{
		src: "https://images.unsplash.com/photo-1724579243894-6a8c9bbfe88c",
		caption:
			"Channeling their inner artist with a paintbrush and a splash of color!",
		id: 1240,
		date: new Date("Oct 2, 2024"),
	},
	{
		src: "https://images.unsplash.com/photo-1723984834599-5357b87f727c",
		caption:
			"Channeling their inner artist with a paintbrush and a splash of color!",
		id: 1241,
		date: new Date("Oct 2, 2024"),
	},
	{
		src: "https://images.unsplash.com/photo-1724505599369-2c1d43324fdc",
		caption:
			"Channeling their inner artist with a paintbrush and a splash of color!",
		id: 1242,
		date: new Date("Oct 2, 2024"),
	},
];

function MediaCardTestRoute() {
	return (
		<div className="bg-blue-200 min-h-screen flex justify-center items-center p-4">
			<ToastContainer
				position="bottom-right"
				autoClose={2000}
				newestOnTop={true}
				closeButton={false}
				hideProgressBar={true}
			/>
			<MediaGrid data={data} />
		</div>
	);
}

export default MediaCardTestRoute;
