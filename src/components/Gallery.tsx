//#region Imports
import { CaretLeft, X } from "@phosphor-icons/react";
import MediaUploadZone from "./MediaUploadZone";
import picture from "@/assets/images/pic1.jpg";
import { useEffect, useState } from "react";
import { clear } from "console";
import MediaUploadStatus from "./MediaUploadStatus";
import { useParams, useNavigate } from "react-router-dom";

import { memberData } from "@/components/MemberTable";
// firebase import
import { 
    getStorage, 
    ref, 
    listAll, 
    getDownloadURL 
} from "firebase/storage";
import { 
    uploadBytesResumable
} from "firebase/storage";

//#endregion

interface GalleryProps {
	handleClose: () => void;
	returning: boolean;
}

function Gallery({ handleClose, returning }: GalleryProps) {
	//TODO: Configure the local gallery to display images here
	// const imgList: string[] = [picture, picture, picture, picture, picture];
	const [images, setImages] = useState<string[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const { id } = useParams();
	//#region Firebase

	//#endregion

	const [uploadingFiles, setUploadingFiles] = useState<
    Array<{
      file: File;
      progress: number;
    }>
  >([]);
	// Firebase
	
	const [patient, setPatient] = useState<memberData>();
	//#region Functions

	/**
	 * Close the gallery
	 */

	/**
	 * Handle an image in the gallery being clicked
	 */
	const handleImageClicked = () => {};

	const handleFilesAdded = (files: File[]) => {
		const storage = getStorage();
		
		const newFiles = files.map((file) => ({
			file,
			progress: 0,
		}));
		setUploadingFiles((prev) => [...prev, ...newFiles]);
	
		newFiles.forEach((fileInfo, index) => {
			const fileRef = ref(storage, `${id}/images/${fileInfo.file.name}`);
			const uploadTask = uploadBytesResumable(fileRef, fileInfo.file);
	
			uploadTask.on('state_changed',
				(snapshot) => {
					const currentProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
					setUploadingFiles(prev => prev.map((file, i) => 
						i === index 
							? { ...file, progress: currentProgress } // Use currentProgress directly
							: file
					));
				},
				(error) => {
					console.error("Upload error:", error);
				},
				() => {
					getDownloadURL(uploadTask.snapshot.ref).then(url => {
						setImages(prev => [...prev, url]);
					});
	
					setTimeout(() => {
						setUploadingFiles(prev => 
							prev.filter((_, i) => i !== index)
						);
					}, 1000);
				}
			);
		});
	};
    // Fetch images from Firebase Storage
    useEffect(() => {
        const fetchImages = async () => {
            try {
                const storage = getStorage();
                const galleryRef = ref(storage, `${id}/images`); 
                
                try {
                    // Try to list items in the folder
                    const result = await listAll(galleryRef);
                    
                    // Get download URLs for all images
                    const urlPromises = result.items.map(imageRef => 
                        getDownloadURL(imageRef)
                    );
                    
                    const imageUrls = await Promise.all(urlPromises);
                    setImages(imageUrls);
                } catch (error: any) {
                    // If error is because folder doesn't exist, that's okay
                    // Firebase will automatically create the folder when we upload first file
                    if (error.code === 'storage/object-not-found') {
                        console.log(`Folder ${id} does not exist yet. Will be created on first upload.`);
                        setImages([]);
                    } else {
                        throw error; // Re-throw if it's a different error
                    }
                }
            } catch (error) {
                console.error("Error fetching images:", error);
            } finally {
                setIsLoading(false);
            }
        };

        if (id) {
            fetchImages();
        }
    }, [id]);

	//#endregion

	return (
		<div className="h-full flex flex-col items-center justify-center gap-y-6 max-w-5xl px-6 py-8 bg-neutrals-light-200">
			{/* Title */}
			<div className="w-full flex justify-between items-center">
				<div className="flex gap-x-2 items-center font-display text-2xl font-bold">
					{returning && (
						<CaretLeft
							className="cursor-pointer hover:text-primary-main transition ease-in-out"
							weight="bold"
							onClick={handleClose}
						/>
					)}
					<h1 className="">Gallery</h1>
				</div>
				{!returning && (
					<X
						className="cursor-pointer text-2xl hover:text-primary-main transition ease-in-out"
						weight="bold"
						onClick={handleClose}
					/>
				)}
			</div>

            {/* Image gallery */}
            {isLoading ? (
                <p className="w-full flex items-center justify-center">Loading...</p>
            ) : images.length > 0 ? (
                <div className="grid h-96 w-full px-2 grid-cols-2 md:grid-cols-4 gap-6 items-center overflow-y-auto scroller">
                    {images.map((imageUrl, index) => (
                        <img
                            key={index}
                            src={imageUrl}
                            alt={`gallery-image-${index}`}
                            className="w-56 aspect-square rounded-xl cursor-pointer hover:scale-95 transition ease-in-out duration-200"
                            onClick={() => handleImageClicked()}
                        />
                    ))}
                </div>
            ) : (
                <p className="w-full flex items-center justify-center">
                    No images found
                </p>
            )}

			{/* Or */}
			<div className="flex w-full items-center gap-x-4">
				<div className="bg-primary-main w-full h-1.5 rounded-lg"></div>
				<p>or</p>
				<div className="bg-primary-main w-full h-1.5 rounded-lg"></div>
			</div>

			{/* Upload media */}
			<h2 className="self-start text-xl text-nowrap">Upload Media</h2>
			<MediaUploadZone onFilesAdded={handleFilesAdded} />
			
			{/* upload status */}
			<div className="w-full space-y-4">
				{uploadingFiles.map((fileInfo, index) => (
					<MediaUploadStatus
					key={fileInfo.file.name}
					fileName={fileInfo.file.name}
					fileSize={fileInfo.file.size}
					uploadProgress={fileInfo.progress}
					setUploadProgress={(value) => {
						const newProgress = typeof value === 'function' 
							? value(fileInfo.progress) 
							: value;
						
						setUploadingFiles(prevFiles => prevFiles.map((file, i) => 
							i === index 
								? { ...file, progress: newProgress }
								: file
						));
					}} 				
				/>
				))}
			</div>
		</div>
	);
}

export { Gallery };
