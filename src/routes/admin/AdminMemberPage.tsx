//#region Imports
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { Plus, PencilSimple, Info, CheckCircle } from "@phosphor-icons/react";

import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, collection, getDocs, DocumentSnapshot } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

// Components
import { NavigationBar } from "@/components/NavigationBar";
import SearchBar from "@/components/SearchBar";
import MediaGrid from "@/components/MediaGrid";
import MemberHeader from "@/components/MemberHeader";
import Button from "@/components/Button";

import { memberData } from "@/components/MemberTable";
import { Gallery } from "@/components/Gallery";
import { twMerge } from "tailwind-merge";
//#endregion

//#region Firebase
const firebaseConfig = JSON.parse(import.meta.env.VITE_FIREBASE_CONFIG);
const app = initializeApp(firebaseConfig);
const database = getFirestore(app);
const auth = getAuth(app);
//#endregion

interface buttonProps {
	size: "small" | "medium" | "large";
	text?: string;
	shape?: "round" | "square";
	icon?: React.ReactNode;
	severity: "primary" | "secondary" | "danger" | "dangerPrimary";
	onClick: () => void;
	title?: string;
}

export default function AdminMemberPage() {
	const navigate = useNavigate();
	const { id } = useParams();

	const [patient, setPatient] = useState<memberData>();
	const [isSelectable, setIsSelectable] = useState<boolean>(false);
	const [isAddingMedia, setIsAddingMedia] = useState<boolean>(false);
	const [masonryWidth, setMasonryWidth] = useState<number>(0);
	const [data, setData] = useState<Media[]>([]);
	const masonryContainerRef = useRef<HTMLDivElement>(null);

	// Button lists
	const buttons: buttonProps[] = [
		{
			size: "medium",
			text: "Add media",
			icon: <Plus />,
			severity: "primary",
			onClick: () => {
				setIsAddingMedia(true);
			},
		},
		{
			shape: "square",
			size: "medium",
			icon: <Info />,
			severity: "secondary",
			onClick: () => { },
			title: "View patient information",
		},
		{
			shape: "square",
			size: "medium",
			icon: isSelectable ? <CheckCircle /> : <PencilSimple />,
			severity: "secondary",
			onClick: () => setIsSelectable(!isSelectable),
			title: "Edit patient information",
		},
	];

	// Search
	const [searchTerm, setSearchTerm] = useState<string>("");

	//#region functions
	const fetchMember = async (id: string) => {
		const docRef = doc(database, "users", id);
		const docSnap = await getDoc(docRef);

		if (docSnap.exists()) {
			setPatient({
				id: docSnap.id,
				name: docSnap.data().fullName,
				profilePicture: {
					type: docSnap.data().profilePicture.type,
					src: docSnap.data().profilePicture.src,
					backgroundColor:
						docSnap.data().profilePicture.backgroundColor,
				},
				storageUsed: docSnap.data().storageUsed,
				lastUpdated: docSnap.data().lastUpdated,
			});
		} else {
		}
	};

	const fetchImages = async (id: string) => {
		const collectionRef = collection(database, 'users', id, 'images');
		const querySnapshot = await getDocs(collectionRef);
		const newData: Media[] = [];
		querySnapshot.forEach((doc: DocumentSnapshot) => {
			const docData = doc.data();
			if (docData)
				newData.push({
					src: docData.src,
					id: doc.id,
					caption: docData.caption,
					date: docData.date.toDate(),
				});
		});
		setData(newData);

	}

	const searchPhotoById = async () => {
		alert("Searching for photo with ID: " + searchTerm);
	};

	//#endregion

	//#region UseEffect
	useEffect(() => {
		// Check if user is signed in
		onAuthStateChanged(auth, (user) => {
			if (!user) {
				navigate("/admin/login");
			}
		});

		if (id) {
			fetchMember(id);
			fetchImages(id);
		}
		else {
			navigate("/admin")
		}

	}, []);

	useEffect(() => {
		const timer = setTimeout(() => {
			setMasonryWidth(masonryContainerRef.current!.offsetWidth);
		}, 30); // Delay in milliseconds

		// Cleanup function to clear timeout
		return () => clearTimeout(timer);
	}, [isAddingMedia]);

	//#endregion

	return (
		<main className="overflow-hidden h-[100vh]">
			<NavigationBar
				userType="admin"
				outerDivClassName="h-[10%] xl:h-[5%]"
			/>
			<div className="flex h-[90%] xl:h-[95%]">
				<div
					className={twMerge(
						"h-full transition-gpu duration-300 overflow-hidden",
						isAddingMedia ? "w-[36vw]" : "w-[0]",
					)}
				>
					{isAddingMedia && (
						<Gallery
							handleClose={() => setIsAddingMedia(false)}
							returning={false}
						/>
					)}
				</div>
				<div
					className="flex-1 p-8 flex flex-col md:gap-y-8 overflow-y-scroll"
					ref={masonryContainerRef}
				>
					{/* User Display */}
					<div className="flex flex-col my-4 lg:flex-row items-center justify-between lg:gap-y-4">
						<MemberHeader
							username={patient?.name!}
							profilePicture={patient?.profilePicture!}
							usernameExtra="text-lg lg:text-xl xl:text-3xl"
						/>
						<div className="flex items-center h-12 gap-x-4 md:gap-x-2">
							{buttons.map((button, index) => (
								<Button
									key={index}
									{...button}
									disabled={isAddingMedia}
									title={button.title}
								/>
							))}
						</div>
					</div>
					{/* Search Bar */}
					<div className="flex w-1/2 xl:w-1/3 my-4">
						<SearchBar
							setSearch={setSearchTerm}
							handleClick={searchPhotoById}
							placeholder="Search by Photo ID"
						/>
					</div>
					{/* Media Grid */}
					<MediaGrid
						data={data}
						selectable={isSelectable}
						fullWidth={masonryWidth}
					/>
				</div>
			</div>
		</main>
	);
}
