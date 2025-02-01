import React, { useEffect, useState } from "react";
import { File, X, Check, Trash } from "@phosphor-icons/react";

// Props definition for MediaUploadStatus
interface MediaUploadStatusProps {
	fileName: string;
	fileSize: number;

	// status
	uploadProgress: number;
	setUploadProgress: React.Dispatch<React.SetStateAction<number>>;
	onCancel?: () => void;
}

// Format bytes into its corresponding format
const formatBytes = (bytes: number, decimals = 2): string => {
	if (bytes === 0) return "0 Bytes";
	const k = 1000; // Decimal multiple
	const dm = decimals < 0 ? 0 : decimals;
	const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
	const i = Math.floor(Math.log(bytes) / Math.log(k));
	return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
};

// Main function
const MediaUploadStatus: React.FC<MediaUploadStatusProps> = ({
	fileName,
	fileSize,
	uploadProgress,
	setUploadProgress,
	onCancel, 
}) => {
	const [isFailed, setIsFailed] = useState(false); 
	const [isCompleted, setIsCompleted] = useState(false);
	const [showDoneStatus, setShowDoneStatus] = useState(false);
    const handleCancel = () => {
        if (onCancel) {
            onCancel();
            setIsFailed(true); 
        }
    };
	// For the trash icon to appear when it complete
	useEffect(() => {
		let timer: ReturnType<typeof setTimeout>;
		if (isCompleted) {
			timer = setTimeout(() => {
				setShowDoneStatus(true);
			}, 2500); // 2.5 sec
		} else {
			setShowDoneStatus(false);
		}
		return () => clearTimeout(timer); // Clean up the timer when isCompleted changes
	}, [isCompleted]);

	// Condition to check if file is uploaded successfully
	useEffect(() => {
		if (uploadProgress === 100) {
			setIsCompleted(true);
		} else {
			setIsCompleted(false);
		}
	}, [uploadProgress]);

	// useState for isFailed will implement here!

	// useState for setUploadProgress will implement here!
	// This function expect to return the correct uploading percentage for the file

	return (
		<div
			className={`flex items-center rounded py-2 px-4 gap-2 h-full w-full text-neutrals-dark-500 ${
				isFailed ? "bg-status-red-light" : "bg-neutrals-light-300"
			}`}
		>
			{/* File Icon */}
			<File size={24} />

			{/* Middle Content: Filename, Progress Bar, Info Text */}
			<div className="flex-1">
				{/*Filename*/}
				<div className="flex flex-col">
					<div className="text-sm font-display mb-1">{fileName}</div>

					{showDoneStatus ? null : (
						<div className="relative mt-1">
							{/* Progress bar */}
							{isFailed ? null : (
								<div className="w-full bg-neutrals-dark-100 h-1 rounded-full">
									<div
										className="bg-primary-main h-1 rounded-full"
										style={{ width: `${uploadProgress}%` }}
									></div>
								</div>
							)}

							{/* Uploading info text */}
							{isFailed ? (
								<div className="flex justify-between text-xs text-status-red-main font-normal">
									<div>Failed to upload</div>
								</div>
							) : isCompleted ? (
								<div className="flex justify-between text-xs text-neutrals-dark-200 font-normal mt-2">
									<div>Complete</div>
									<div className=" text-status-green-main">
										<Check size={16} />
									</div>
								</div>
							) : (
								<div className="flex justify-between text-xs text-neutrals-dark-200 font-display mt-2">
									<div>
										{formatBytes(
											(fileSize * uploadProgress) / 100,
										)}{" "}
										of {formatBytes(fileSize)}
									</div>
									<div>Uploading... {uploadProgress}%</div>
								</div>
							)}
						</div>
					)}
				</div>
			</div>
		{/* X Button */}
		{isCompleted ? (
			showDoneStatus ? (
				<button className="pl-2 text-neutrals-dark-200 hover:text-neutrals-dark-500 transition ease-in-out duration-300">
					<Trash size={24} />
				</button>
			) : null
		) : (
			<button 
				className="pl-2 text-neutrals-dark-200 hover:text-neutrals-dark-500"
				onClick={handleCancel}
			>
				<X size={24} />
			</button>
		)}
		</div>
	);
};

export default MediaUploadStatus;
