import { useState } from "react";
import clsx from "clsx";
import Modal from "@/components/Modal";
import InputField from "@/components/InputField";
import MemberProfilePicture from "@/components/MemberProfilePicture";
import Button from "@/components/Button";
import { WarningCircle } from "@phosphor-icons/react";
import { CollectionReference, doc, setDoc } from "firebase/firestore";
import rString from "@/helpers/generatePasscode";
import { useNavigate } from "react-router-dom";

interface AddMemberProps {
	/* Toggles the modal's visibility */
	isOpen: boolean;

	/* Callback to close the modal */
	onClose: () => void;

	/* Reference to the users collection in Firestore */
	usersRef: CollectionReference;
}
function AddMember({ isOpen, onClose, usersRef }: AddMemberProps) {
	const navigate = useNavigate();
	const [nameError, setNameError] = useState<boolean>(true);
	const [idError, setIdError] = useState<boolean>(true);
	const [name, setName] = useState<string>("");
	const [id, setId] = useState<string>("");
	const [profilePicture, setProfilePicture] = useState<{
		type: "icon" | "img";
		src: string;
		backgroundColor: string;
	}>({
		type: "icon",
		src: "PawPrint",
		backgroundColor: "water",
	});

	// Content style
	const content = "flex flex-col gap-6";

	// Function to add member
	const addMember = async () => {
		console.log("Adding member", idError, nameError);
		if (!nameError && !idError) {
			// Add member to Firestore
			// TODO: CHECK IF ID AND NAME ARE UNIQUE
			const memberRef = doc(usersRef, id);
			await setDoc(memberRef, {
				fullName: name,
				lastName: name.split(" ")[name.split(" ").length - 1],
				storageUsed: 0,
				lastUpdated: new Date(),
				id: id,
				passcode: rString(),
				profilePicture: profilePicture,
			});
			resetAndClose();
			navigate(`/admin/members/${id}`);
		}
	};

	const resetAndClose = () => {
		setNameError(true);
		setIdError(true);
		setName("");
		setId("");
		onClose();
	};

	return (
		<Modal
			isOpen={isOpen}
			onClose={resetAndClose}
			title="Add Member"
			disableCloseOnClickOutside={true}
			content={
				<div className={clsx(content)}>
					<InputField
						type="text"
						label="Name"
						error={false}
						required={true}
						placeholder={"John Doe"}
						setError={setNameError}
						setInput={setName}
					/>
					<InputField
						type="text"
						label="Unique ID"
						error={false}
						required={true}
						placeholder="12345678"
						setError={setIdError}
						setInput={setId}
					/>
					<MemberProfilePicture
						profilePicture={profilePicture}
						setProfilePicture={setProfilePicture}
					/>
				</div>
			}
			actions={
				<div className="flex flex-col gap-1 w-full">
					<Button
						size="medium"
						text="Add Member"
						onClick={addMember}
					/>
					{(idError || nameError) && (
						<div className="flex flex-row justify-start items-center gap-1 text-red-500 text-body-sm">
							<WarningCircle size={16} />
							<span>
								{idError && nameError
									? "Name and ID should not be empty"
									: idError
									? "ID should be unique and not empty"
									: nameError
									? "Name should not be empty"
									: "Error"}
							</span>
						</div>
					)}
				</div>
			}
		></Modal>
	);
}

export default AddMember;
