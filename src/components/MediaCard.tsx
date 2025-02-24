import { displayToast } from "@/utils";
import { Copy, Check, WarningCircle } from "@phosphor-icons/react";
import { useLayoutEffect, useRef, useState, useCallback } from "react";
import Button from "./Button";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";
import { useParams } from "react-router-dom";
import { initializeApp } from "@firebase/app";
import { doc, getFirestore, updateDoc } from "firebase/firestore";

//#region Firebase
const firebaseConfig = JSON.parse(import.meta.env.VITE_FIREBASE_CONFIG);
const app = initializeApp(firebaseConfig);
const database = getFirestore(app);
//#endregion

interface MediaCardProps {
  src: string;
  caption?: string | null;
  date: Date;
  id: string;
  selectable?: boolean;
  onImageClick?: (index: number) => void;
  index?: number;
}

const options: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "short",
  day: "numeric",
};

// MediaCard.tsx
function MediaCard({ 
	src, 
	caption, 
	date, 
	id, 
	selectable,
	onImageClick,
	index 
  }: MediaCardProps) {
	const params = useParams();
	const userId = params.id;
	const [isEditingCaption, setIsEditingCaption] = useState(false);
	const [newCaption, setNewCaption] = useState<string | null | undefined>(caption);
	const [isSelected, setIsSelected] = useState(false);
	const [isHovered, setIsHovered] = useState(false);
	const [temporaryCaption, setTemporaryCaption] = useState(caption);
	const [error, setError] = useState<string | null>(null);
	const captionTextAreaRef = useRef<HTMLTextAreaElement | null>(null);
	const [characterCount, setCharacterCount] = useState(caption?.length || 0);

	const handleCaption = async (cap: string) => {
		try {
		  console.log('UserId:', userId);
		  console.log('ImageId:', id);
		  console.log('New Caption:', cap);
	  
		  if (!userId) {
			console.error("No user ID available");
			setError("Unable to update caption: No user ID");
			return;
		  }
	  
		  const docRef = doc(database, "users", userId!, "images", id);
		  console.log('Document Path:', docRef.path);
	  
		  await updateDoc(docRef, {
			caption: cap,
		  });
		  
		  setNewCaption(cap);
		  setIsEditingCaption(false);
		} catch (error) {
		  console.error("Error updating caption:", error);
		  setError("Failed to update caption");
		}
	  };
  
	const handleImageClick = useCallback((e: React.MouseEvent) => {
	  // Only trigger preview if we're not editing and not in selection mode
	  if (!selectable && !isEditingCaption && onImageClick && typeof index === 'number') {
		e.stopPropagation();
		onImageClick(index);
	  }
	}, [selectable, isEditingCaption, onImageClick, index]);
  
	const handleCaptionDoubleClick = useCallback((e: React.MouseEvent) => {
	  e.stopPropagation();
	  if (userId) {
		setIsEditingCaption(true);
	  }
	}, [userId]);
  
	const handleCaptionSave = useCallback((e: React.MouseEvent) => {
	  e.stopPropagation();
	  if (captionTextAreaRef.current) {
		const newText = captionTextAreaRef.current.value.trim();
		if (newText.split(" ").length > 50) {
		  setError("Please keep caption within 50 words");
		} else {
		  setError(null);
		  handleCaption(newText);
		}
	  }
	}, []);
  
	const handleCaptionCancel = useCallback((e: React.MouseEvent) => {
	  e.stopPropagation();
	  setIsEditingCaption(false);
	  setTemporaryCaption(newCaption);
	  setError(null);
	}, [newCaption]);
  
	return (
	  <div
		className={clsx(
		  "flex flex-col rounded-lg relative min-w-[72px]",
		  selectable && "hover:shadow-zero hover:shadow-primary-main",
		  isSelected && "shadow-zero shadow-primary-main",
		)}
		onMouseEnter={() => setIsHovered(true)}
		onMouseLeave={() => setIsHovered(false)}
	  >
		{/* Selection Checkbox */}
		{selectable && (
		  <span
			className={clsx(
			  "absolute right-0 top-0 w-8 h-8 rounded-lg m-2 z-[999] flex justify-center items-center",
			  isSelected
				? "bg-primary-light border-2 border-primary-dark hover:bg-primary-main"
				: isHovered &&
				  "bg-white border-neutrals-dark-300 border-2 hover:bg-neutrals-dark-100",
			)}
			onClick={(e) => {
			  e.stopPropagation();
			  setIsSelected(!isSelected);
			}}
		  >
			{isSelected && <Check fill="white" size={16} />}
		  </span>
		)}
  
		{/* Image Container */}
		<div 
		  className={clsx("relative rounded-lg cursor-pointer")}
		  onClick={handleImageClick}
		>
		  <img
			src={src}
			alt="Image"
			className={clsx("object-fit rounded-t-lg min-w-[172px]")}
		  />
		</div>
  
		{/* Caption Section */}
		<div
		  className={twMerge(
			"bg-white rounded-b-lg flex flex-col gap-4 focus:outline-none",
			isEditingCaption ? "" : "p-4",
		  )}
		  onClick={e => e.stopPropagation()} // Prevent preview when clicking caption area
		>
		  {!isEditingCaption ? (
			<div
			  className="text-body-reg whitespace-pre-line"
			  onDoubleClick={handleCaptionDoubleClick}
			>
			  {newCaption ? newCaption : "Add Text..."}
			</div>
		  ) : (
			<div className="flex flex-col justify-center bg-neutrals-light-300 rounded-lg">
			  <textarea
				className="w-full bg-neutrals-light-300 p-4 resize-none overflow-hidden"
				defaultValue={newCaption || caption || "Add Text..."}
				ref={captionTextAreaRef}
				maxLength={24} 
				onChange={(e) => {
					const value = e.target.value;
					setCharacterCount(value.length);
					if (value.length > 24) {
					  setError("Caption cannot exceed 24 characters");
					} else {
					  setError(null);
					  setTemporaryCaption(value);
					}
				  }}
			  />
			  
			<div className="flex flex-col gap-2 p-2">
				<div className="flex justify-end pr-2">
					<span className="text-sm text-neutrals-dark-300">
					{`${characterCount}/24`}
					</span>
				</div>
				<div className="flex self-end justify-center items-end gap-2">
					<Button
					text="Cancel"
					className="h-1/4"
					severity="secondary"
					onClick={handleCaptionCancel}
					size="small"
					/>
					<Button
					className="h-1/4"
					text="Save"
					onClick={handleCaptionSave}
					size="small"
					/>
				</div>
				</div>
			</div>
		  )}
		  
		  {error && (
			<div className="text-status-red-main flex flex-row gap-2 items-center">
			  <WarningCircle /> {error}
			</div>
		  )}
  
		  {/* Footer Section */}
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
				onClick={(e) => {
				  e.stopPropagation();
				  navigator.clipboard.writeText(id.toString());
				  displayToast("ID Copied!", "success");
				}}
			  />
			</div>
		  </div>
		</div>
	  </div>
	);
  }
  
  export default MediaCard;