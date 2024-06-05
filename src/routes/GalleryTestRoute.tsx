import { Gallery } from "@/components/Gallery";
import { useState } from "react";

const GalleryTestRoute = () => {
	const [uploadProgress, setUploadProgress] = useState(0);
	return (
		<div className="h-full flex items-center justify-center bg-slate-200 px-4 py-20">
			<Gallery />
		</div>
	);
};

export default GalleryTestRoute;
