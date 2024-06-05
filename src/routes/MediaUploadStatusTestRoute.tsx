import MediaUploadStatus from "@/components/MediaUploadStatus";
import { useState } from "react";

// TODO: Add the +20% button here to test it and the fail to upload button
//
function MediaUploadStatusTestRoute() {
	const [uploadProgress, setUploadProgress] = useState(0);
	return (
		<div className="text-h2 flex flex-col items-center justify-center min-h-screen bg-primary-light">
			<div>
				<h1>Is this what you looking for? </h1>
				{/* fileSize is in bytes */}
				{/* Play around with uploadProgress in percentage and isFailed variables in MediaUploadStatus.tsx */}
				<MediaUploadStatus
					fileName="Testing.png"
					fileSize={1000000000}
					uploadProgress={uploadProgress}
					setUploadProgress={setUploadProgress}
				/>
			</div>
		</div>
	);
}
export default MediaUploadStatusTestRoute;
