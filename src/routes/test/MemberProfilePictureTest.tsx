import React from "react";
import MemberProfilePicture from "@/components/MemberProfilePicture";
import { Pencil } from "@phosphor-icons/react";
import Modal from "@/components/Modal";

const MemberProfilePictureTest = () => {
	return (
		<div className="fixed inset-0 flex flex-col gap-6 items-center justify-center bg-gray-900">
			<Modal
				isOpen={true}
				onClose={() => {}}
				title="Edit Member Modal"
				icon={<Pencil size={32} />}
				content={<MemberProfilePicture />}
			/>
		</div>
	);
};

export default MemberProfilePictureTest;
