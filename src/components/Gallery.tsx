//#region Imports
import { CaretLeft } from "@phosphor-icons/react";
import MediaUploadZone from "./MediaUploadZone";
//#endregion

function Gallery() {
	//#region Functions

	/**
	 * Close the gallery
	 */
	const handleClose = () => {};

	//#endregion

	return (
		<div className="flex flex-col items-center justify-center gap-y-6 w-[90%] md:w-[80%] lg:w-[70%] max-w-5xl px-6 rounded-xl py-8 bg-white">
			{/* Image gallery */}
			<div className="w-full">
				<div className="flex gap-x-2 items-center font-display text-2xl font-bold">
					<CaretLeft
						className="cursor-pointer hover:text-primary-light transition ease-in-out"
						weight="bold"
						onClick={handleClose}
					/>
					<h1 className="">Gallery</h1>
				</div>
			</div>

			{/* Upload media */}
			<MediaUploadZone />
		</div>
	);
}

export { Gallery };
