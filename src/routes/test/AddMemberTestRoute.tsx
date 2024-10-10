import AddMember from "@/components/AddMember";
import { useState } from "react";

function AddMemberTestRoute() {
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
			<AddMember
				isOpen={isModalOpen}
				onClose={toggleModal}
			></AddMember>
		</div>
	);
}

export default AddMemberTestRoute;
