import { useState } from "react";
import clsx from "clsx";
import Modal from "@/components/Modal";
import InputField from "@/components/InputField";
import MemberProfilePicture from "@/components/MemberProfilePicture";
import Button from "@/components/Button";
import { WarningCircle } from "@phosphor-icons/react";

interface AddMemberProps {
	/* Toggles the modal's visibility */
	isOpen: boolean;

	/* Callback to close the modal */
	onClose: () => void;
}
function AddMember({ isOpen, onClose }: AddMemberProps) {
	const [nameError, setNameError] = useState<boolean>(false);
	const [idError, setIdError] = useState<boolean>(false);

	// Content style
	const content = "flex flex-col gap-6";

	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			title="Add Member"
			content={
				<div className={clsx(content)}>
					<InputField
						type="text"
						label="Name"
						error={false}
						required={true}
						placeholder={"John Doe"}
						setError={setNameError}
						setInput={() => {}}
					/>
					<InputField
						type="text"
						label="Unique ID"
						error={false}
						required={true}
						placeholder="12345678"
						setError={setIdError}
						setInput={() => {}}
					/>
					<MemberProfilePicture />
				</div>
			}
			actions={
				<div className="flex flex-col gap-1 w-full">
					<Button
						shape="medium"
						text="Add Member"
						onClick={onClose}
					/>
					{(idError || nameError) && (
						<div className="flex flex-row justify-start items-center gap-1 text-red-500 text-body-sm">
							<WarningCircle size={16} />
							<span> Error</span>
						</div>
					)}
				</div>
			}
		></Modal>
	);
}

export default AddMember;