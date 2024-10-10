import EditMember from "@/components/EditMember";
import { useState } from "react";

function EditMemberTestRoute() {
	// State to toggle the modal
	const [isModalOpen, setIsModalOpen] = useState(false);

	// Function to toggle the modal
	const toggleModal = () => setIsModalOpen(!isModalOpen);

	return (
		<div className="fixed inset-0 flex flex-col gap-6 items-center justify-center bg-pink-300">
			<button
				className="bg-blue-500 rounded"
				onClick={toggleModal}
			>
				Open Modal
			</button>
			<EditMember
				isOpen={isModalOpen}
				onClose={toggleModal}
			></EditMember>
		</div>
	);
}

export default EditMemberTestRoute;
