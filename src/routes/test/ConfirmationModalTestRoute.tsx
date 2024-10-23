import React, { useState } from "react";
import { Trash } from "@phosphor-icons/react";
import ConfirmationModal from "@/components/ConfirmationModal";

function ConfirmationModalTestRoute() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleConfirm = () => {
    console.log("Confirmed!");
    setTimeout(() => {
      setIsModalOpen(false);
    }, 700);
  };
  

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-primary-light">
      <div className="w-1/4">
        <button
          onClick={openModal}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Open Confirmation Modal
        </button>
      </div>
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={closeModal}
        headerText="Delete Item"
        description="Are you sure you want to delete this item? This action cannot be undone."
        buttonText="Delete"
        onConfirm={handleConfirm}
        icon={<Trash size={24}/>}
        errorText="Please confirm your devious action!"
        primaryColor="primary" // The severity like primary, secondary or danger
        secondaryColor="secondary"
      />
    </div>
  );
}

export default ConfirmationModalTestRoute;
