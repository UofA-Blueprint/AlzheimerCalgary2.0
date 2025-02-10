import { ReactNode, useState, useContext } from "react";
import IconOption from "./IconOption";
import ColorPicker from "./ColorPicker";
import MediaUploadZone from "./MediaUploadZone";
import {
	PawPrint,
	Tree,
	Camera,
	Pizza,
	Atom,
	Binoculars,
	SoccerBall,
	Coffee,
	Plus,
} from "@phosphor-icons/react";
import clsx from "clsx";
import { ProfileColor } from "@/types/ProfileColor";
import { profile } from "console";
import Modal from "@/components/Modal";
import { 
    getStorage, 
    ref, 
    getDownloadURL,
} from "firebase/storage";
import { uploadBytesResumable } from "firebase/storage";
import { v4 as uuid } from 'uuid';

interface MemberProfilePictureProps {
	/** The profile picture */
	profilePicture: {
		type: "icon" | "img";
		src: string;
		backgroundColor: string;
	};
	/** The function to set the profile picture */
	setProfilePicture: (profilePicture: {
		type: "icon" | "img";
		src: string;
		backgroundColor: string;
	}) => void;
}

const MemberProfilePicture = ({
	profilePicture,
	setProfilePicture,
}: MemberProfilePictureProps) => {
	const body = "flex flex-col w-full gap-2";

	const controls = "flex flex-row items-start justify-between w-full";

	const icons =
		"flex flex-row items-start justify-start flex-wrap gap-4 w-full";

	const header = "text-h4";

	const [backgroundColor, setBackgroundColor] =
		useState<ProfileColor>("bg-profile-water");

	const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

	const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
    const [uploadingFiles, setUploadingFiles] = useState<Array<{ progress: number }>>([]);
	
	const getIconContent = (iconName: string) => {
		// If it's not the Plus icon or don't have an uploaded image --> show regular icon
		if (iconName !== 'Plus' || profilePicture.type !== 'img') {
			switch(iconName) {
				case 'PawPrint':
					return <PawPrint size={32} />;
				case 'Tree':
					return <Tree size={32} />;
				case 'Camera':
					return <Camera size={32} />;
				case 'Pizza':
					return <Pizza size={32} />;
				case 'Atom':
					return <Atom size={32} />;
				case 'Binoculars':
					return <Binoculars size={32} />;
				case 'SoccerBall':
					return <SoccerBall size={32} />;
				case 'Coffee':
					return <Coffee size={32} />;
				case 'Plus':
					return <Plus size={32} />;
				default:
					return <Plus size={32} />;
			}
		}
	
		// If we uploaded image, show it 
		if (iconName === 'Plus' && profilePicture.type === 'img') {
			return (
				<img 
					src={profilePicture.src} 
					alt="Profile" 
					className="w-8 h-8 rounded-full object-cover"
				/>
			);
		}
	
		// Fallback to Plus icon
		return <Plus size={32} />;
	};

	const iconMap: Record<string, ReactNode> = {
		PawPrint: getIconContent('PawPrint'),
		Tree: getIconContent('Tree'),
		Camera: getIconContent('Camera'),
		Pizza: getIconContent('Pizza'),
		Atom: getIconContent('Atom'),
		Binoculars: getIconContent('Binoculars'),
		SoccerBall: getIconContent('SoccerBall'),
		Coffee: getIconContent('Coffee'),
		Plus: getIconContent('Plus'),
	};

	const handleFilesAdded = async (files: File[]) => {
		const storage = getStorage();
		
		const file = files[0]; 
		const extension = file.name.split('.').pop();
		const uniqueFileName = `${uuid()}.${extension}`;
		
		
		const timestamp = new Date().getTime();
		const fileRef = ref(storage, `profile-pictures/${timestamp}_${uniqueFileName}`);
		const uploadTask = uploadBytesResumable(fileRef, file);
	
		uploadTask.on('state_changed',
			(snapshot) => {
				const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
				setUploadingFiles([{ progress }]);
			},
			(error) => {
				console.error("Upload error:", error);
			},
			() => {
				getDownloadURL(uploadTask.snapshot.ref).then(url => {
					setProfilePicture({
						type: 'img',
						src: url,
						backgroundColor: profilePicture.backgroundColor
					});
					setIsUploadModalOpen(false);
					setUploadingFiles([]);
				});
			}
		);
	};
	const iconList = Object.keys(iconMap);
	return (
		<div className={clsx(body)}>
			<div className={clsx(controls)}>
				<h2 className={clsx(header)}>Member Profile Picture</h2>
				<ColorPicker
					backgroundColor={backgroundColor}
					setBackgroundColor={(color) => {
						setBackgroundColor(color);
						let colorSplit = color.split("-");
						let colorName = colorSplit[colorSplit.length - 1];
						setProfilePicture({
							...profilePicture,
							backgroundColor: colorName,
						});
					}}
				/>
			</div>
			<div className={clsx(icons)}>
				{iconList.map((iconName) => (
					<IconOption
						key={iconName}
						icon={iconMap[iconName]}
						color={backgroundColor}
						selected={selectedIcon === iconName}
						setSelectedIcon={() => {
							if (iconName === 'Plus') {
								setIsUploadModalOpen(true);
							} else {
								setSelectedIcon(iconName);
								setProfilePicture({
									...profilePicture,
									type: "icon",
									src: iconName,
								});
							}
						}}
					/>
				))}
			</div>
			<Modal 
                isOpen={isUploadModalOpen}
                onClose={() => setIsUploadModalOpen(false)}
                title="Upload Profile Picture"
                size="md"
                content={
                    <div className="flex flex-col gap-4">
                        <MediaUploadZone onFilesAdded={handleFilesAdded} />
                        {uploadingFiles.map((file, index) => (
                            <div key={index} className="w-full">
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div
                                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                        style={{ width: `${file.progress}%` }}
                                    />
                                </div>
                                <p className="text-sm text-gray-600 mt-1">
                                    Upload progress: {Math.round(file.progress)}%
                                </p>
                            </div>
                        ))}
                    </div>
                }
            />
		</div>
	);
};

export default MemberProfilePicture;
