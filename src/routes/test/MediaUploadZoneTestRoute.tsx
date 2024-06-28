import React from "react";
import MediaUploadZone from "@/components/MediaUploadZone";

const MediaUploadZonetestRoute: React.FC = () => {
	return (
		<div className="w-full h-screen flex flex-col justify-center items-center">
			<div className="">
				{/* renember to put it in a parent div that is large enough*/}
				<MediaUploadZone className="w-[24rem] sm:w-[30rem] md:w-[50rem]" />
			</div>
		</div>
	);
};

export default MediaUploadZonetestRoute;
