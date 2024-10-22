import React from "react";
import MemberPageBackground from "@/components/MemberPageBackground";
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
				content={<MemberPageBackground />}
			/>
		</div>
	);
};

export default MemberProfilePictureTest;
