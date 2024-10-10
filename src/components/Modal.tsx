import clsx from "clsx";
import { useEffect, useRef, useCallback } from "react";
import { X } from "@phosphor-icons/react";

interface ModalProps {
	/* Toggles the modal's visibility */
	isOpen: boolean;

	/* Callback to close the modal */
	onClose: () => void;

	/* Width of the modal (rem) */
	size?: "sm" | "md" | "lg" | "xl";

	/* Title of the modal */
	title: string;

	/* 32x32 Phosphor icon for the title */
	icon?: React.ReactNode;

	/* Disables the modal from closing on escape key press */
	disableCloseOnEscape?: boolean;

	/* Disables the modal from closing on click outside */
	disableCloseOnClickOutside?: boolean;

	/* Content of the modal */
	content?: React.ReactNode;

	/* Actions of the modal */
	actions?: React.ReactNode;
}
function Modal({
	isOpen = false,
	onClose,
	size = "lg",
	title,
	icon = null,
	disableCloseOnEscape = false,
	disableCloseOnClickOutside = false,
	content,
	actions,
}: ModalProps) {
	const sizes = {
		sm: "w-[22.5rem]",
		md: "w-[31rem]",
		lg: "w-[35rem]",
		xl: "w-[37.5rem]",
	};

	// Body style
	const body = `flex flex-col p-8 gap-4 bg-neutrals-light-100 rounded-lg max-w-[80vw] max-h-[95vh] overflow-auto`;

	// Header style
	const header = "flex flex-row w-full justify-between items-center";

	// Header title style
	const headerTitle = "flex flex-row gap-2 text-h3 text-neutrals-dark-500";

	// Header title icon style
	const headerTitleIcon = "flex items-center justify-center pb-1";

	// Close button style
	const closeButton =
		"flex items-center justify-center w-8 h-8 text-neutrals-dark-200";

	// Form styles
	const form = "flex flex-col gap-8";

	const modalRef = useRef<HTMLDivElement>(null);

	// Memoize the handleClickOutside function
	const handleClickOutside = useCallback(
		(event: MouseEvent) => {
			if (
				!disableCloseOnClickOutside &&
				modalRef.current &&
				!modalRef.current.contains(event.target as Node)
			) {
				onClose();
			}
		},
		[disableCloseOnClickOutside, onClose],
	);

	// Close modal on click outside
	useEffect(() => {
		if (isOpen) {
			document.addEventListener("mousedown", handleClickOutside);
		}

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [isOpen, handleClickOutside]);

	// Close modal on escape keypress
	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (!disableCloseOnEscape && event.key === "Escape") {
				onClose();
			}
		};

		if (isOpen) {
			document.addEventListener("keydown", handleKeyDown);
		}

		return () => document.removeEventListener("keydown", handleKeyDown);
	}, [isOpen, disableCloseOnEscape, onClose]);

	// Encapsulates the visibility of the modal in a prop
	if (!isOpen) return null;

	return (
		<div
			ref={modalRef}
			className={clsx(body, sizes[size])}
		>
			<div className={clsx(header)}>
				<div className={clsx(headerTitle)}>
					<i className={clsx(headerTitleIcon)}>{icon}</i>
					<h3>{title}</h3>
				</div>
				<div className={clsx(closeButton)}>
					<button onClick={onClose}>
						<X size={32} />
					</button>
				</div>
			</div>
			<div className={clsx(form)}>
				{content}
				{actions}
			</div>
		</div>
	);
}

export default Modal;
