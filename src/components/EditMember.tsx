import clsx from "clsx";
import Modal from "@/components/Modal";
import InputField from "@/components/InputField";
import MemberProfilePicture from "@/components/MemberProfilePicture";
import { useParams, useNavigate } from "react-router-dom";

import Button from "@/components/Button";
import { WarningCircle, PencilSimple } from "@phosphor-icons/react";
import { useState } from "react";
import { getFirestore, doc, updateDoc, deleteDoc, collection, query, where, getDocs, increment, DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import { getStorage, ref as storageRef, deleteObject, ref, getMetadata } from "firebase/storage";
import { memberData } from "@/components/MemberTable";

interface EditMemberProps {
	member: memberData;
	className?: string;
	isStateUpdate: boolean;
	setIsStateUpdate: (value: boolean) => void;
	isOpen: boolean;
	onClose: () => void;
}
interface InputProfilePictureType {
	type: string;
	src: string;
	backgroundColor?: string;
}
interface ProfilePictureType {
	type: "icon" | "img";
	src: string;
	backgroundColor: string;
}
function EditMember({ member, isStateUpdate, setIsStateUpdate, isOpen, onClose }: EditMemberProps) {
	// Content style

	const [profilePicture, setProfilePicture] = useState<{
		type: "icon" | "img";
		src: string;
		backgroundColor: string;
	}>({
		type: "icon",
		src: "PawPrint",
		backgroundColor: "water",
	});

	const [name, setName] = useState(member.name);
	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const { id } = useParams();
	const content = "flex flex-col gap-6";
	const database = getFirestore();
	const storage = getStorage();
	const navigate = useNavigate();
	const [isProfilePictureChanged, setIsProfilePictureChanged] = useState(false);
	const [isNameChanged, setIsNameChanged] = useState(false);
	const [inputError, setInputError] = useState(false);

	const defaultProfile = {
		type: "icon" as const,
		src: "PawPrint",
		backgroundColor: "water"
	};
	const handleNameChange = (value: string | ((prevState: string) => string)) => {
		const newValue = typeof value === 'function' ? value(name) : value;
		setName(newValue);
		if (inputError) setInputError(false);
		if (newValue !== member.name) {
			setIsNameChanged(true);
		}
	};

	const handleProfilePictureChange = (newProfilePicture: InputProfilePictureType) => {
		if (newProfilePicture.type !== "icon" && newProfilePicture.type !== "img") {
			console.error("Invalid profile picture type");
			return;
		}

		const validatedProfilePicture: ProfilePictureType = {
			type: newProfilePicture.type as "icon" | "img",
			src: newProfilePicture.src,
			backgroundColor: newProfilePicture.backgroundColor || profilePicture.backgroundColor
		};

		setProfilePicture(validatedProfilePicture);
		setIsProfilePictureChanged(true);
	};

	const handleSaveChanges = async () => {
		if (!name.trim()) {
			setInputError(true);
			setError("Name cannot be empty");
			return;
		}
		// If nothing changed, just close the modal
		if (!isNameChanged && !isProfilePictureChanged) {
			onClose();
			return;
		}

		setIsLoading(true);
		setError("");

		try {
			const docRef = doc(database, "users", id!);
			const updateData: any = {
				lastUpdated: new Date()
			};

			if (isNameChanged && name !== member.name) {
				const parts = name.split(" ");
				const lastName = parts[parts.length - 1];

				// Query for existing lastNames
				const q = query(collection(database, "users"), where("lastName", "==", lastName));
				const querySnapshot = await getDocs(q);

				updateData.fullName = name;
				updateData.lastName = querySnapshot.empty ? lastName : `${lastName}${querySnapshot.size}`;
			}

			// Only update profile picture if it changed
			if (isProfilePictureChanged) {
				await deleteProfileImage();
				updateData.profilePicture = profilePicture;

			}

			await updateDoc(docRef, updateData);
			setIsStateUpdate(!isStateUpdate);
			onClose();
		} catch (err) {
			setError("Failed to update member information. Please try again.");
			console.error("Error updating document:", err);
		} finally {
			setIsLoading(false);
		}
	};

	const deleteImageDoc = async (imageDoc: QueryDocumentSnapshot<DocumentData, DocumentData>) => {
		const storage = getStorage();
		const imageDocData: Media = imageDoc.data() as Media;
		const imageUrl: string = imageDocData.src;
		const imageRef = ref(storage, imageUrl);
		const metadata = await getMetadata(imageRef);
		const byte = metadata.size;
		await deleteObject(imageRef);

		// remove image from document
		const userRef = doc(database, "users", id!);
		updateDoc(userRef, {
			storageUsed: increment(-byte / 1048576)
		})
		await deleteDoc(imageDoc.ref);

	};



	const deleteProfileImage = async () => {
		if (member.profilePicture.type === 'img') {
			try {
				const urlPath = member.profilePicture.src;
				const filePath = urlPath.split('/o/')[1].split('?')[0];
				const decodedPath = decodeURIComponent(filePath);

				const imageRef = storageRef(storage, decodedPath);
				await deleteObject(imageRef);
			} catch (err) {
				console.error("Error deleting profile image from storage:", err);
				throw err;
			}
		}
	};
	const handleDeleteMember = async () => {
		setIsLoading(true);
		setError("");
		try {
			await deleteProfileImage();
			const docRef = doc(database, "users", id!);
			const collectionRef = collection(docRef, "images");
			const imageDocs = await getDocs(collectionRef);
			imageDocs.forEach(async (doc) => {
				await deleteImageDoc(doc);
			})
			await deleteDoc(docRef);
			onClose();
			navigate("/admin");
		} catch (err) {
			setError("Failed to delete member page. Please try again.");
			console.error("Error deleting document:", err);
		} finally {
			setIsLoading(false);
		}
	};

	const handleResetMember = async () => {
		setIsLoading(true);
		setError("");

		try {
			await deleteProfileImage();

			const docRef = doc(database, "users", id!);
			await updateDoc(docRef, {
				profilePicture: defaultProfile,
				lastUpdated: new Date()
			});
			const collectionRef = collection(docRef, "images");
			const imageDocs = await getDocs(collectionRef);
			imageDocs.forEach(async (doc) => {
				await deleteImageDoc(doc);
			})
			setIsStateUpdate(!isStateUpdate);
			onClose();
		} catch (err) {
			setError("Failed to reset member page. Please try again.");
			console.error("Error resetting document:", err);
		} finally {
			setIsLoading(false);
		}
	};
	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			icon={<PencilSimple size={24} />}
			title="Edit Member"
			content={
				<div className={clsx(content)}>
					<InputField
						type="text"
						label="Name"
						error={false}
						required={false}
						placeholder={member.name}
						setError={() => { }}
						setInput={(value) => handleNameChange(value)}

					/>
					<MemberProfilePicture
						profilePicture={profilePicture}
						setProfilePicture={handleProfilePictureChange}
					/>
				</div>
			}
			actions={
				<div className="flex flex-col gap-1 w-full">
					<div className="flex flex-col gap-4">
						<div>
							<Button
								size="medium"
								text="Save Changes"
								onClick={handleSaveChanges}
								disabled={isLoading}
							/>
						</div>
						<div className="flex flex-row gap-4">
							<Button
								size="medium"
								text="Delete Member Page"
								severity="danger"
								onClick={handleDeleteMember}
								disabled={isLoading}
							/>
							<Button
								size="medium"
								text="Reset Member Page"
								severity="secondary"
								onClick={handleResetMember}
								disabled={isLoading}
							/>
						</div>
					</div>
					{(error || inputError) && (
						<div className="flex flex-row justify-start items-center gap-1 text-status-red-main text-body-sm">
							<WarningCircle size={16} />
							<span>{inputError ? "Name input required" : error}</span>
						</div>
					)}
				</div>
			}
		></Modal>
	);
}

export default EditMember;
