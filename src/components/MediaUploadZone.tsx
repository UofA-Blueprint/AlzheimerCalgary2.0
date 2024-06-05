import { UploadSimple, WarningCircle } from "@phosphor-icons/react";
import { useState, useEffect, useRef } from "react";
import { twMerge } from "tailwind-merge";
import MediaUploadStatus from "./MediaUploadStatus";

//#region interface
interface MediaUploadZoneProps {
	className?: string;
}
//#endregion

const MediaUploadZone = ({ className }: MediaUploadZoneProps) => {
	const [isDragOver, setIsDragOver] = useState(false);
	const [droppedFiles, setDroppedFiles] = useState<File[]>([]);
	const [isValidFile, setIsValidFile] = useState(true);
	const [uploadProgress, setUploadProgress] = useState(0);

	const UploadZoneClassName =
		"w-full h-full border-2 border-dashed flex flex-col justify-center items-center rounded-md border-primary-main text-base" +
		(isDragOver
			? " transform transition-transform duration-300 border-primary-dark ease-in-out scale-95"
			: "");

	// handle drop events, drop the PNG, JPEG and GIF type of file
	const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
		event.preventDefault();
		const files = Array.from(event.dataTransfer.files);
		const validFiles = filterValidFiles(files);

		setDroppedFiles((prevFiles) => [...prevFiles, ...validFiles]);
		setIsDragOver(false);
	};

	const filterValidFiles = (files: File[]): File[] => {
		const allowedExtensions = [".jpg", ".jpeg", ".png", ".gif"];

		return files.filter((file) => {
			const extension = file.name
				.toLowerCase()
				.slice(file.name.lastIndexOf("."));
			const isValid = allowedExtensions.includes(extension);
			isValid ? setIsValidFile(true) : setIsValidFile(false);
			console.log(
				`File ${file.name} is ${isValid ? "valid" : "invalid"}.`,
			);
			return isValid;
		});
	};

	const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
		event.preventDefault();
		setIsDragOver(true);
	};

	const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
		event.preventDefault();
		setIsDragOver(false);
	};

	useEffect(() => {
		console.log("Dropped files:", droppedFiles);
	}, [droppedFiles]);

	return (
		<div
			className={twMerge(
				"w-full h-full font-display flex flex-col",
				className,
			)}
		>
			<div
				className={UploadZoneClassName}
				onDrop={handleDrop}
				onDragOver={handleDragOver}
				onDragLeave={handleDragLeave}
			>
				<div className="flex flex-col justify-center items-center gap-y-2 p-8">
					<UploadSimple className="text-3xl opacity-80" />
					<p className="text-lg opacity-80">Drag and Drop here</p>
					<p className="text-lg opacity-80">or</p>

					<input
						type="file"
						id="fileInput"
						onChange={(event) => {
							if (event.target.files) {
								const files = Array.from(event.target.files);
								const validFiles = filterValidFiles(files);
								setDroppedFiles((prevFiles) => [
									...prevFiles,
									...validFiles,
								]);
							}
						}}
						className="hidden"
					/>
					<label
						htmlFor="fileInput"
						className="text-primary-main cursor-pointer text-lg font-bold hover:text-primary-light transition ease-in-out"
					>
						Browse file
					</label>
				</div>
				{droppedFiles.length > 0 && (
					<div className="overflow-hidden">
						{/* {droppedFiles.slice(0, 3).map((file, index) => (
							<div
								key={index}
								className="truncate w-full text-center opacity-80"
							>
								{file.name}
							</div>
						))} */}
						{droppedFiles.length > 3 && <div>...</div>}
					</div>
				)}
			</div>
			<div className="flex flex-row justify-between text-sm text-gray-500 my-2 font-display">
				<div>Accepted file types: png, jpeg</div>
				<div>Max size: 25MB</div>
			</div>
			{!isValidFile && (
				<div className="flex flex-row text-sm items-center gap-x-2 text-red-500 font-display">
					<WarningCircle></WarningCircle> File type not supported
				</div>
			)}

			{/* Upload Status */}
			<div className="mt-4 flex flex-col gap-y-4">
				<MediaUploadStatus
					fileName="Testing.png"
					fileSize={1000000000}
					uploadProgress={uploadProgress}
					setUploadProgress={setUploadProgress}
				/>
				<MediaUploadStatus
					fileName="Testing.png"
					fileSize={1000000000}
					uploadProgress={50}
					setUploadProgress={setUploadProgress}
				/>
				<MediaUploadStatus
					fileName="Testing2.png"
					fileSize={1000000000}
					uploadProgress={100}
					setUploadProgress={setUploadProgress}
				/>
			</div>
		</div>
	);
};

export default MediaUploadZone;
