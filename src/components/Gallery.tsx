//#region Imports
import { CaretLeft, X } from "@phosphor-icons/react";
import MediaUploadZone from "./MediaUploadZone";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import MediaUploadStatus from "./MediaUploadStatus";
import { useParams } from "react-router-dom";
import ConfirmationModal from "@/components/ConfirmationModal";
import { Trash } from "@phosphor-icons/react";
import { initializeApp } from "firebase/app";
import { collection, getCountFromServer, getDocs, getFirestore, deleteDoc, query, where, getDoc } from "firebase/firestore";
import { doc, setDoc, updateDoc } from "firebase/firestore";

// Firebase import
import {
	getStorage,
	ref,
	getDownloadURL,
	UploadTask
} from "firebase/storage";
import {
	uploadBytesResumable,
	deleteObject
} from "firebase/storage";
import { v4 as uuid } from 'uuid';
import { toast, ToastContainer } from "react-toastify";
import Toast from "./Toast";
import clsx from "clsx";
//#endregion


//#region Firebase
const firebaseConfig = JSON.parse(import.meta.env.VITE_FIREBASE_CONFIG);
const app = initializeApp(firebaseConfig);
const database = getFirestore(app);

//#endregion

interface GalleryProps {
	handleClose: () => void;
	returning: boolean;
	isStateUpdate: boolean;
	setIsStateUpdate: Dispatch<SetStateAction<boolean>>;
}

function Gallery({ handleClose, returning, isStateUpdate, setIsStateUpdate }: GalleryProps) {

	// load the gallery
	const [images, setImages] = useState<Media[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const { id } = useParams();

	// confirmation handling  
	const [isModalOpen, setIsModalOpen] = useState(false);
	const openModal = () => setIsModalOpen(true);
	const closeModal = () => setIsModalOpen(false);

	// image delete
	const [imageToDelete, setImageToDelete] = useState<string | null>(null);

	// handle confirm delete
	const handleConfirm = async () => {
		if (imageToDelete) {
			await handleDeleteImage(imageToDelete);
			setImageToDelete(null);
			closeModal();
		}
	};

	const [uploadingFiles, setUploadingFiles] = useState<Array<{
		file: File;
		progress: number;
		uploadTask?: UploadTask;
	}>>([]);

	//#region Functions

	/**
	 * Close the gallery
	 */

	/**
	 * Handle an image in the gallery being clicked
	 */
	const handleImageClicked = async (imageUrl: string) => {
		try {
			const userRef = doc(database, "users", id!)
			const collectionRef = collection(userRef, "images")
			const q = query(collectionRef, where("src", "==", imageUrl));
			// docRef = 
			const querySnapshot = await getDocs(q);
			querySnapshot.forEach(async (document) => {
				const currentData = document.data();
				await updateDoc(doc(collectionRef, document.id),
					{
						isDisplayed: !currentData.isDisplayed,

					});
				setIsStateUpdate(!isStateUpdate);
			});
		}
		catch (error) {
			console.error("Error getting:", error);
		}
	}

	// handle image being deleted
	const handleDeleteImage = async (imageUrl: string) => {
		try {
			const storage = getStorage();
			const imageRef = ref(storage, imageUrl);
			await deleteObject(imageRef);

			// Remove the image from the state
			setImages(prev => prev.filter(image => image.src !== imageUrl));

			// remove image from document
			const userRef = doc(database, "users", id!);
			const collectionRef = collection(userRef, "images");

			const q = query(collectionRef, where("src", "==", imageUrl));
			const querySnapshot = await getDocs(q)

			querySnapshot.forEach(async (document) => {
				await deleteDoc(doc(collectionRef, document.id));
			});
			setIsStateUpdate(!isStateUpdate);
		} catch (error) {
			console.error("Error deleting image:", error);
		}
	};


	const handleFilesAdded = (files: File[]) => {
		const storage = getStorage();

		const newFiles = files.map((file) => {
			const extension = file.name.split('.').pop();
			const uniqueFileName = `${uuid()}.${extension}`;  // Generate unique ID
			return {
				file,
				progress: 0,
				uniqueFileName
			};
		});
		setUploadingFiles((prev) => [...prev, ...newFiles]);

		newFiles.forEach((fileInfo, index) => {
			const fileRef = ref(storage, `${id}/images/${fileInfo.uniqueFileName}`);
			const uploadTask = uploadBytesResumable(fileRef, fileInfo.file);

			// Store the upload task
			setUploadingFiles(prev => prev.map((file, i) =>
				i === index
					? { ...file, uploadTask, progress: 0 }
					: file
			));

			uploadTask.on('state_changed',
				(snapshot) => {
					const currentProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
					setUploadingFiles(prev => prev.map((file, i) =>
						i === index
							? { ...file, progress: currentProgress }
							: file
					));
				},
				(error) => {
					toast(<Toast message={error.toString()} severity="success" />, {
						toastId: "error",
						style: {
							background: "transparent",
							boxShadow: "none",
						},
					}
					);

				},
				() => {
					getDownloadURL(uploadTask.snapshot.ref).then(url => {
						const userRef = doc(database, "users", id!);
						const collectionRef = collection(userRef, "images");
						let count = 0;
						getCountFromServer(collectionRef).then(snapshot => {
							count = snapshot.data().count;
							const docRef = doc(collectionRef, count.toString());
							const newDoc = {
								src: url,
								caption: "",
								date: new Date(),
								isDisplayed: false,
							};
							setDoc(docRef, newDoc).then(async () => {
								const doc = await getDoc(docRef);
								const docData = doc.data();
								const newImage: Media = {
									id: doc.id,
									src: docData!.src,
									caption: docData!.caption,
									date: docData!.date,
									isDisplayed: docData!.isDisplayed,
								}

								setImages(prev => [...prev, newImage]);
							});
						})



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
			const querySnapshot = await getDocs(collection(database, "users", id!, "images"));
			const images: Media[] = [];
			querySnapshot.forEach((doc) => {
				const data = doc.data();
				images.push({
					id: doc.id,
					src: data.src,
					caption: data.caption,
					date: data.date,
					isDisplayed: data.isDisplayed,
				} as Media);
			});
			setImages(images);
		};

		if (id) {
			fetchImages();
			setIsLoading(false);
		}
	}, [id, isStateUpdate]);

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

			{/* confirmation pop up */}
			<div className="z-50">
				<ConfirmationModal
					isOpen={isModalOpen}
					onClose={closeModal}
					headerText="Delete Item"
					description="Are you sure you want to delete this item? This action cannot be undone."
					buttonText="Delete"
					onConfirm={handleConfirm}
					icon={<Trash size={24} />}
					errorText="Please confirm your devious action!"
					primaryColor="primary" // The severity like primary, secondary or danger
					secondaryColor="secondary"
				/>
			</div>
			{/* Image gallery */}
			{isLoading ? (
				<p className="w-full flex items-center justify-center">Loading...</p>
			) : images.length > 0 ? (
				<div className="grid h-96 w-full px-2 grid-cols-2 md:grid-cols-4 gap-6 items-center overflow-y-auto scroller">
					{images.map((image, index) => (
						<div key={index} className="relative group">
							<img
								src={image.src}
								alt={`gallery-image-${index}`}
								className={clsx("w-56 object-cover object-center aspect-square rounded-xl cursor-pointer hover:scale-95 transition ease-in-out duration-200", image.isDisplayed && "border-4 border-primary-dark")}
								onClick={() => handleImageClicked(image.src)}
							/>
							<button
								onClick={(e) => {
									e.stopPropagation();
									// handleDeleteImage(imageUrl);
									setImageToDelete(image.src);
									openModal();
								}}
								className="absolute -top-1 -right-1 p-1.5 rounded-full bg-neutrals-light-200 text-neutrals-dark-500 opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-red-400 hover:text-white"
							>
								<X size={16} weight="bold" />
							</button>
						</div>
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
						onCancel={() => {
							// Cancel the upload task if exists
							if (fileInfo.uploadTask) {
								fileInfo.uploadTask.cancel();
							}
							// Remove this file from uploadingFiles
							setUploadingFiles(prev =>
								prev.filter((_, i) => i !== index)
							);
						}}
					/>
				))}
			</div>
			<ToastContainer
				position="bottom-right"
				autoClose={2000}
				newestOnTop={true}
				closeButton={false}
				hideProgressBar={true}
			/>
		</div>
	);
}

export { Gallery };
