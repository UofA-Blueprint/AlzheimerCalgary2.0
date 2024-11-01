import clsx from "clsx";
import Modal from "@/components/Modal";
import InputField from "@/components/InputField";
import MemberProfilePicture from "@/components/MemberProfilePicture";
import MemberPageBackground from "@/components/MemberPageBackground";
import Button from "@/components/Button";
import { WarningCircle, PencilSimple } from "@phosphor-icons/react";

interface EditMemberProps {
	/* Toggles the modal's visibility */
	isOpen: boolean;

	/* Callback to close the modal */
	onClose: () => void;
}
function EditMember({ isOpen, onClose }: EditMemberProps) {
	// Content style
	const content = "flex flex-col gap-6";

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
						placeholder={"John Doe"}
						setError={() => {}}
						setInput={() => {}}
					/>
					<MemberProfilePicture />
					<MemberPageBackground />
				</div>
			}
			actions={
				<div className="flex flex-col gap-1 w-full">
					<div className="flex flex-col gap-4">
						<div>
							<Button
								size="medium"
								text="Save Changes"
								onClick={onClose}
							/>
						</div>
						<div className="flex flex-row gap-4">
							<Button
								size="medium"
								text="Delete Member Page"
								severity="danger"
							/>
							<Button
								size="medium"
								text="Reset Member Page"
								severity="secondary"
							/>
						</div>
					</div>
					<div className="flex flex-row justify-start items-center gap-1 text-red-500 text-body-sm">
						<WarningCircle size={16} />
						<span> Error</span>
					</div>
				</div>
			}
		></Modal>
	);
}

export default EditMember;
