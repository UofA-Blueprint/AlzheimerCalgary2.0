import React, { useState, useEffect } from "react";
import { CaretLeft } from "@phosphor-icons/react";
import MediaUploadZone from "./MediaUploadZone";
import { getStorage, ref, uploadBytesResumable, listAll, getDownloadURL } from "firebase/storage";
import Button from "@/components/Button";
import MediaUploadStatus from "./MediaUploadStatus";

interface FileUploadStatus {
	file: File;
	progress: number;
}

function Gallery() {
	const [uploads, setUploads] = useState<FileUploadStatus[]>([]);
	const [imgList, setImgList] = useState<string[]>([]);

	// Create a root reference
	const storage = getStorage();

	/**
	 * Extract current pictures in /images inside firebase storage
	 */
	const displayImages = async () => {
		const listRef = ref(storage, "/images"); 
		try {
			const res = await listAll(listRef);
			const imageUrls = await Promise.all(
				res.items.map((itemRef) => getDownloadURL(itemRef))
			);
			setImgList(imageUrls);
		} catch (error) {
			console.error("Error displaying images: ", error);
		}
	};

	/**
	 * Close the gallery
	 */
	const handleClose = () => {};

	// Useeffect to call the function to fetch images on component mount
	useEffect(() => {
		displayImages(); // 
	}, []);

	/**
	 * Handle an image in the gallery being clicked
	 */
	const handleImageClicked = () => {};

	// Function to handle adding files and simulate 1-second upload process
	const handleFilesAdded = (files: File[]) => {
		files.forEach((file) => {
			// Create a new upload status object
			const newUpload: FileUploadStatus = {
				file,
				progress: 0, 
			};

			// Add the new upload to the uploads state
			setUploads((prevUploads) => [...prevUploads, newUpload]);

			// Create a reference to where the file will be stored
			const fileRef = ref(storage, `images/${file.name}`);

			// Create a file upload task
			const uploadTask = uploadBytesResumable(fileRef, file);

			// Monitor the file upload progress
			uploadTask.on(
				"state_changed",
				(snapshot) => {
					const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
					console.log(`Upload is ${progress}% done`);

					// Update the progress state for the UI
					setUploads((prevUploads) =>
						prevUploads.map((prevUpload) =>
							prevUpload.file.name === file.name
								? { ...prevUpload, progress }
								: prevUpload
						)
					);
				},
				(error) => {
					// Handle errors
					console.error("Upload failed", error);
				},
				async () => {
					try {
						const downloadURL = await getDownloadURL(fileRef);
						console.log("File available at", downloadURL);

						// Add the download URL to the image list
						setImgList((prevImgList) => [...prevImgList, downloadURL]);
						

					} catch (error) {
						console.error("Error getting download URL:", error);
					}
				}
			);
		});
	};

	return (
		<div className="flex flex-col items-center justify-center gap-y-6 max-w-5xl px-6 rounded-xl py-8 bg-white w-5/6">
			{/* Title */}
			<div className="w-full">
				<div className="flex gap-x-2 items-center font-display text-2xl font-bold">
					<CaretLeft
						className="cursor-pointer hover:text-primary-main transition ease-in-out"
						weight="bold"
						onClick={handleClose}
					/>
					<h1 className="">Gallery</h1>
				</div>
			</div>

			{/* Image gallery */}
			<div className={`grid h-96 w-full grid-cols-2 md:grid-cols-4 gap-6 items-center overflow-y-auto scroller min-h-[24rem]`}>
				{imgList.length > 0 ? (
					imgList.map((img, index) => (
						<img
							key={index}
							src={img}
							alt="gallery"
							className="w-56 aspect-square rounded-xl cursor-pointer hover:scale-95 transition ease-in-out duration-200"
							onClick={handleImageClicked}
						/>
					))
				) : (
					<p className="col-span-full text-center text-gray-500">No images available</p>
				)}
			</div>

			{/* Or */}
			<div className="flex w-full items-center gap-x-4">
				<div className="bg-primary-main w-full h-1.5 rounded-lg"></div>
				<p>or</p>
				<div className="bg-primary-main w-full h-1.5 rounded-lg"></div>
			</div>

			{/* Upload media */}
			<h2 className="w-full text-xl">Upload Media</h2>
			<MediaUploadZone onFilesAdded={handleFilesAdded} />

			{/* Display upload status */}
			<div className="w-full flex flex-col gap-4 mt-4">
				{uploads.map((upload, index) => (
					<MediaUploadStatus
						key={index}
						fileName={upload.file.name}
						fileSize={upload.file.size}
						uploadProgress={upload.progress}
						setUploadProgress={() => {}}
					/>
				))}
			</div>

			{/* Buttons */}
			<div className="flex flex-row gap-5 w-full">
				<Button
					onClick={() => {}}
					text={"Cancel"}
					rounded={false}
					fill={false}
					className="text-red-600 border-red-600 active:bg-red-600 active:text-red-600 before:bg-red-600 w-2/5"
				/>
				<Button
					onClick={() => {}}
					disabled={false}
					text="Add Picture"
					className="w-3/5"
				/>
			</div>
		</div>
	);
}

export { Gallery };
