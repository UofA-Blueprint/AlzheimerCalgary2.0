import Modal from "@/components/Modal";
import Button from "@/components/Button";
import InputField from "@/components/InputField";
import { Truck } from "@phosphor-icons/react";
import { useState } from "react";

function ModalTestRoute() {
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
			<Modal
				size="lg"
				isOpen={isModalOpen}
				onClose={toggleModal}
				title="Modal Title"
				icon={<Truck size={24} />}
				content={
					<div className="flex flex-col gap-6">
						{/* <InputField
							type="text"
							error={false}
							label="Name"
							required={false}
							setInput={() => {}}
						/>
						<InputField
							type="text"
							error={false}
							required={false}
							setInput={() => {}}
						/>
						<InputField
							type="text"
							error={false}
							label="Phone"
							required={false}
							setInput={() => {}}
						/> */}
					</div>
				}
				actions={
					<div className="flex flex-row gap-6 h-4">
						<Button
							text="Cancel"
							size="medium"
							severity="secondary"
							onClick={toggleModal}
						/>
						<Button
							text="Submit"
							size="medium"
							severity="primary"
							onClick={toggleModal}
						/>
					</div>
				}
			></Modal>
		</div>
	);
}

export default ModalTestRoute;
