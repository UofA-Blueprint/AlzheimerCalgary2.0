// Temporary data for media grid
const data = [
	// Array of media items with image source, caption, ID, and date

	{
		src: "https://images.unsplash.com/photo-1724579243894-6a8c9bbfe88c",
		caption:
			"Channeling their inner artist with a paintbrush and a splash of color!",
		id: 1234,
		date: new Date("Oct 5, 2024"),
	},
	{
		src: "https://images.unsplash.com/photo-1723984834599-5357b87f727c",
		caption:
			"Channeling their inner artist with a paintbrush and a splash of color!",
		id: 1235,
		date: new Date("Oct 4, 2024"),
	},
	{
		src: "https://images.unsplash.com/photo-1724505599369-2c1d43324fdc",
		caption:
			"Channeling their inner artist with a paintbrush and a splash of color!",
		id: 1236,
		date: new Date("Oct 3, 2024"),
	},
	{
		src: "https://images.unsplash.com/photo-1724579243894-6a8c9bbfe88c",
		caption:
			"Channeling their inner artist with a paintbrush and a splash of color!",
		id: 1237,
		date: new Date("Oct 7, 2024"),
	},
	{
		src: "https://images.unsplash.com/photo-1723984834599-5357b87f727c",
		caption:
			"Channeling their inner artist with a paintbrush and a splash of color!",
		id: 1238,
		date: new Date("Oct 8, 2024"),
	},
	{
		src: "https://images.unsplash.com/photo-1724505599369-2c1d43324fdc",
		caption:
			"Channeling their inner artist with a paintbrush and a splash of color!",
		id: 1239,
		date: new Date("Oct 2, 2024"),
	},
	{
		src: "https://images.unsplash.com/photo-1724579243894-6a8c9bbfe88c",
		caption:
			"Channeling their inner artist with a paintbrush and a splash of color!",
		id: 1240,
		date: new Date("Oct 2, 2024"),
	},
	{
		src: "https://images.unsplash.com/photo-1723984834599-5357b87f727c",
		caption:
			"Channeling their inner artist with a paintbrush and a splash of color!",
		id: 1241,
		date: new Date("Oct 2, 2024"),
	},
	{
		src: "https://images.unsplash.com/photo-1724505599369-2c1d43324fdc",
		caption:
			"Channeling their inner artist with a paintbrush and a splash of color!",
		id: 1242,
		date: new Date("Oct 9, 2024"),
	},
	{
		src: "https://images.unsplash.com/photo-1724579243894-6a8c9bbfe88c",
		caption:
			"Channeling their inner artist with a paintbrush and a splash of color!",
		id: 1240,
		date: new Date("Oct 10, 2024"),
	},
	{
		src: "https://images.unsplash.com/photo-1723984834599-5357b87f727c",
		caption:
			"Channeling their inner artist with a paintbrush and a splash of color!",
		id: 1241,
		date: new Date("Oct 2, 2024"),
	},
	{
		src: "https://images.unsplash.com/photo-1724505599369-2c1d43324fdc",
		caption:
			"Channeling their inner artist with a paintbrush and a splash of color!",
		id: 1242,
		date: new Date("Oct 2, 2024"),
	},
];

//#region Imports
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Plus, PencilSimple, Info, CheckCircle } from "@phosphor-icons/react";

import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

// Components
import { NavigationBar } from "@/components/NavigationBar";
import SearchBar from "@/components/SearchBar";
import MediaGrid from "@/components/MediaGrid";
import MemberHeader from "@/components/MemberHeader";
import Button from "@/components/Button";

import { memberData } from "@/components/MemberTable";
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
}

export default function AdminPage() {
	const navigate = useNavigate();
	const { id } = useParams();

	const [patient, setPatient] = useState<memberData>();
	const [isSelectable, setIsSelectable] = useState<boolean>(false);

	// Button lists
	const buttons: buttonProps[] = [
		{
			size: "medium",
			text: "Add media",
			icon: <Plus />,
			severity: "primary",
			onClick: () => {},
		},
		{
			shape: "square",
			size: "medium",
			icon: <Info />,
			severity: "secondary",
			onClick: () => {},
		},
		{
			shape: "square",
			size: "medium",
			icon: isSelectable ? <CheckCircle /> : <PencilSimple />,
			severity: "secondary",
			onClick: () => setIsSelectable(!isSelectable),
		},
	];

	// Search
	const [searchTerm, setSearchTerm] = useState<string>("");

	//#region functions
	const fetchMember = async () => {
		const docRef = doc(database, "users", id!);
		const docSnap = await getDoc(docRef);

		if (docSnap.exists()) {
			console.log("Patient Found");
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
			console.log("Patient Not Found");
		}
	};

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

		fetchMember();
	}, []);
	//#endregion

	return (
		<div className="flex flex-col">
			<NavigationBar userType="admin" />
			<div className="mx-8 my-8 md:mx-16 flex flex-col gap-y-8">
				{/* User Display */}
				<div className="flex flex-col lg:flex-row items-center justify-between gap-y-4">
					<MemberHeader
						username={patient?.name!}
						profilePicture={patient?.profilePicture!}
						usernameExtra="text-2xl md:text-3xl lg:text-4xl"
					/>
					<div className="flex items-center gap-x-4">
						{buttons.map((button, index) => (
							<Button
								key={index}
								{...button}
							/>
						))}
					</div>
				</div>

				{/* Search Bar */}
				<div className="flex w-full lg:w-1/3 h-12 mt-4">
					<SearchBar
						setSearch={setSearchTerm}
						handleClick={searchPhotoById}
						placeholder="Search by Photo ID"
					/>
				</div>

				{/* Media Grid */}
				<MediaGrid
					data={data}
					sortOrder={"latest"}
					selectable={isSelectable}
				/>
			</div>
		</div>
	);
}
