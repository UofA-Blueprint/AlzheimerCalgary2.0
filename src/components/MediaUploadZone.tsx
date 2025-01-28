import React, { useState, useEffect } from "react";
import { UploadSimple, WarningCircle } from "@phosphor-icons/react";
import MediaUploadStatus from "./MediaUploadStatus";

interface MediaUploadZoneProps {
	onFilesAdded: (files: File[]) => void;
	className?: string;
}

const MediaUploadZone = ({ onFilesAdded, className }: MediaUploadZoneProps) => {
	const [isDragOver, setIsDragOver] = useState(false);
	const [isValidFile, setIsValidFile] = useState(true);

	const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
		event.preventDefault();
		const files = Array.from(event.dataTransfer.files);
		const validFiles = filterValidFiles(files);
		onFilesAdded(validFiles);
		setIsDragOver(false);
	};

	const filterValidFiles = (files: File[]): File[] => {
		const allowedExtensions = [".jpg", ".jpeg", ".png", ".gif"];
		return files.filter((file) => {
			const extension = file.name
				.toLowerCase()
				.slice(file.name.lastIndexOf("."));
			const isValid = allowedExtensions.includes(extension);
			setIsValidFile(isValid);
			return isValid;
		});
	};

	const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
		event.preventDefault();
		setIsDragOver(true);
	};

	const handleDragLeave = () => {
		setIsDragOver(false);
	};

	return (
		<div
			className={`w-full h-full font-display flex flex-col ${className} text-nowrap`}
			onDrop={handleDrop}
			onDragOver={handleDragOver}
			onDragLeave={handleDragLeave}
		>
			<div className="w-full h-full border-2 border-dashed flex flex-col justify-center items-center rounded-md border-primary-main text-base">
				<UploadSimple className="text-3xl opacity-80" />
				<p className="text-lg opacity-80">Drag and Drop here</p>
				<p className="text-lg opacity-80">or</p>
				<input
					type="file"
					id="fileInput"
					multiple
					onChange={(event) => {
						const files = Array.from(event.target.files || []);
						const validFiles = filterValidFiles(files);
						onFilesAdded(validFiles);
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
			{!isValidFile && (
				<div className="flex text-red-500 items-center">
					<WarningCircle />
					<span>File type not supported</span>
				</div>
			)}
		</div>
	);
};

export default MediaUploadZone;
