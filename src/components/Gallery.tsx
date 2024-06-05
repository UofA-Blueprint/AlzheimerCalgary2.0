//#region Imports
import MediaUploadZone from "./MediaUploadZone";
import MediaUploadStatus from "./MediaUploadStatus";
//#endregion

function Gallery() {
	const handleFilesDropped = (files: File[]) => {
		// handle file
		console.log("Dropped files:", files);
	};

	return (
		<div>
			{/* Image gallery */}
			<div></div>

			{/* Upload media */}
			<MediaUploadZone />
		</div>
	);
}

export { Gallery };
