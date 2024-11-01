import { displayToast } from "@/utils";
import { Copy, Check, WarningCircle } from "@phosphor-icons/react";
import { useLayoutEffect, useRef, useState } from "react";
import Button from "./Button";
import clsx from "clsx";

interface MediaCardProps {
	src: string;
	caption?: string | null;
	date: Date;
	id: number;
	selectable?: boolean;
}

const options: Intl.DateTimeFormatOptions = {
	year: "numeric",
	month: "short",
	day: "numeric",
};

function MediaCard({
	src,
	caption,
	date,
	id,
	selectable = false,
}: MediaCardProps) {
	const [isEditingCaption, setIsEditingCaption] = useState(false);
	const [newCaption, setNewCaption] = useState<string | null | undefined>(
		caption,
	);
	const [isSelected, setIsSelected] = useState(false);
	const [isHovered, setIsHovered] = useState(false);
	const [temporaryCaption, setTemporaryCaption] = useState(caption);
	const [error, setError] = useState<string | null>(null);
	const captionTextAreaRef = useRef<HTMLTextAreaElement | null>(null);

	const copyHandler = () => {
		navigator.clipboard.writeText(id.toString());
		displayToast("ID Copied!", "success");
	};

	useLayoutEffect(() => {
		if (captionTextAreaRef.current) {
			captionTextAreaRef.current.style.height = "auto";
			const scrollHeight = captionTextAreaRef.current.scrollHeight;
			captionTextAreaRef.current.style.height = `${scrollHeight + 16}px`;
		}
	}, [temporaryCaption, newCaption, caption, isEditingCaption]);

	return (
		<div
			className={clsx(
				"flex flex-col rounded-lg relative",
				selectable && "hover:shadow-zero hover:shadow-primary-main",
				isSelected && "shadow-zero shadow-primary-main",
			)}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			{selectable && (
				<span
					className={clsx(
						"absolute right-0 top-0 w-8 h-8 rounded-lg m-2 z-[999] flex justify-center items-center",

						isSelected
							? " bg-primary-light border-2 border-primary-dark hover:bg-primary-main"
							: isHovered &&
									"bg-white border-neutrals-dark-300 border-2 hover:bg-neutrals-dark-100",
					)}
					onClick={() => setIsSelected(!isSelected)}
				>
					{isSelected && (
						<Check
							fill="white"
							size={16}
						></Check>
					)}
				</span>
			)}
			<div className={clsx("relative rounded-lg")}>
				<img
					src={src}
					alt="Image"
					className={clsx("object-fit rounded-t-lg")}
				/>
			</div>
			<div className="bg-white p-2 rounded-b-lg flex flex-col gap-4">
				{!isEditingCaption ? (
					<div
						className="text-body-reg whitespace-pre-line"
						onDoubleClick={() => setIsEditingCaption(true)}
					>
						{newCaption}
					</div>
				) : (
					<div className="flex flex-col justify-center bg-neutrals-light-300">
						<textarea
							className="w-full bg-neutrals-light-300 p-2 resize-none overflow-hidden"
							defaultValue={
								newCaption || caption || "Add Text..."
							}
							ref={captionTextAreaRef}
							onChange={() => {
								setTemporaryCaption(
									captionTextAreaRef.current?.value,
								);
							}}
						/>
						<div className="flex self-end justify-center items-end gap-2">
							<Button
								text="Cancel"
								className="h-1/4"
								severity="secondary"
								onClick={() => setIsEditingCaption(false)}
								size="small"
							/>
							<Button
								className="h-1/4"
								text="Save"
								onClick={() => {
									if (
										captionTextAreaRef.current?.value &&
										captionTextAreaRef.current?.value.split(
											" ",
										).length > 50
									) {
										setError(
											"Please keep caption within 50 words",
										);
									} else {
										setError(null);
										setNewCaption(
											captionTextAreaRef.current?.value.trim(),
										);
										setIsEditingCaption(false);
									}
								}}
								size="small"
							/>
						</div>
					</div>
				)}
				{error && (
					<div className="text-status-red-main flex flex-row gap-2 items-center">
						<WarningCircle /> {error}
					</div>
				)}
				<div className="flex justify-between">
					<span className="text-sm text-neutrals-dark-200">
						{date.toLocaleDateString("en-US", options)}
					</span>
					<div className="flex items-center gap-2">
						<span className="text-sm text-neutrals-dark-300">
							ID: {id}
						</span>
						<Copy
							className="hover:cursor-pointer"
							onClick={copyHandler}
						></Copy>
					</div>
				</div>
			</div>
		</div>
	);
}

export default MediaCard;
