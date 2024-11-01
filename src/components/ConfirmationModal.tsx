import React from "react";
import Modal from "@/components/Modal";
import Button from "@/components/Button";
import { WarningCircle } from "@phosphor-icons/react";

interface ConfirmationModalProps {
	isOpen: boolean;
	onClose: () => void;
	headerText: string;
	description: string;
	buttonText: string;
	onConfirm: () => void;
	icon?: React.ReactNode;
	errorText?: string;
	primaryColor?: "primary" | "secondary" | "danger";
	secondaryColor?: "primary" | "secondary" | "danger";
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
	isOpen,
	onClose,
	headerText,
	description,
	buttonText,
	onConfirm,
	icon,
	errorText,
	primaryColor = "primary",
	secondaryColor = "secondary",
}) => {
	// Define the content to pass to the Modal
	const modalContent = (
		<div className="flex flex-col">
			{/* Description */}
			<p className="text-neutrals-dark-100 ml-8 mr-7 mt-[-1rem] leading-tight">
				{description}
			</p>
		</div>
	);

	return (
		<Modal
			isOpen={isOpen}
			hideCloseButton={true}
			onClose={onClose}
			title={headerText}
			icon={icon}
			content={modalContent}
			actions={
				<div className="flex justify-end items-center mt-[-1rem] gap-[0.65rem]">
					{errorText && (
						<div className="flex items-center text-status-red-main gap-1">
							<WarningCircle
								size={20}
								className="flex-shrink-0"
							/>
							<span className="text-status-red-main leading-tight">
								{errorText}
							</span>
						</div>
					)}
					<div className="flex gap-2">
						{/* Cancel Button */}
						<Button
							text="Cancel"
							onClick={onClose}
							size="small"
							severity={secondaryColor}
						/>
						{/* Confirm Button */}
						<Button
							text={buttonText}
							onClick={onConfirm}
							size="small"
							severity={primaryColor}
						/>
					</div>
				</div>
			}
		/>
	);
};

export default ConfirmationModal;
