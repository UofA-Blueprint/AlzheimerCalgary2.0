import { Gallery } from "@/components/Gallery";
import { useState } from "react";

const GalleryTestRoute = () => {
	const [uploadProgress, setUploadProgress] = useState(0);
	return (
		<div className="h-screen flex items-center justify-center bg-slate-200">
			<Gallery />
		</div>
	);
};

export default GalleryTestRoute;
