import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { NavigationBar } from "@/components/NavigationBar";
import MediaGrid from "@/components/MediaGrid";
import MemberHeader from "@/components/MemberHeader";
import { useNavigate } from "react-router-dom";
import SortDropdownList from "@/components/SortDropdownList";
import {
	getFirestore,
	collection,
	getDocs,
	query,
	where,
	DocumentData,
} from "firebase/firestore";
import { initializeApp } from "firebase/app";

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

//#region firebase
const firebaseConfig = JSON.parse(import.meta.env.VITE_FIREBASE_CONFIG);
const app = initializeApp(firebaseConfig);
const database = getFirestore(app);
const usersRef = collection(database, "users");
//#endregion

export default function MemberPage() {
	const navigate = useNavigate();
	const [sortOrder, setSortOrder] = useState<string | null>(null);
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const [userData, setUserData] = useState<DocumentData | null>(null);

	type SortOrder = "latest" | "oldest";

	// Check for user login info in localStorage and fetch user data from Firebase
	useEffect(() => {
		const fetchData = async () => {
			const lastName = localStorage.getItem("lastName");
			const passcode = localStorage.getItem("passcode");
			if (!lastName || !passcode) {
				// Redirect to login page if lastName or passcode is missing
				navigate("/login");
				return;
			}
			// Firebase query to find user with matching lastName and passcode
			const q = query(
				collection(database, "users"),
				where("lastName", "==", lastName),
				where("passcode", "==", passcode),
			);

			const querySnapshot = await getDocs(q);
			if (!querySnapshot.empty) {
				const userDoc = querySnapshot.docs[0].data(); // Set retrieved user data to userData state
				setUserData(userDoc);
			} else {
				navigate("/login"); // Redirect to login if no user matches
			}
		};

		fetchData();
	}, [navigate]);

	// Function to update sortOrder and close the dropdown menu
	const handleSortSelect = (order: "latest" | "oldest" | string | null) => {
		setSortOrder(order); // Update sort order (latest or oldest)
		setIsDropdownOpen(false); // Close dropdown after selection
	};

	return (
		<div className="font-display relative">
			{/* Toast notification container */}
			<ToastContainer
				position="bottom-right"
				autoClose={2000}
				newestOnTop={true}
				closeButton={false}
				hideProgressBar={true}
			/>
			{/* Navigation bar for the user type "user" */}
			<NavigationBar
				userType="user"
				className="sticky top-0 left-0"
			/>
			<div className="px-16 py-2 w-[calc(100%-5px)] ">
				{/* Display user header with profile picture and username if userData is available */}
				<div className="flex flex-col space-y-4 py-6">
					{userData && (
						<MemberHeader
							username={userData.fullName}
							profilePicture={{
								type: "img",
								src: userData.profilePicture,
							}}
						/>
					)}
				</div>
				{/* SortDropdownList component for choosing sort order */}
				<div className="min-h-screen pt-2 flex flex-col">
					<div className="w-56 left-12 pb-4  place-self-end">
						{/* temporary */}
						<SortDropdownList
							onSelect={handleSortSelect}
						></SortDropdownList>
					</div>
					{/* MediaGrid component to display sorted media items */}
					<MediaGrid
						data={data}
						sortOrder={sortOrder}
						selectable={false}
					/>
				</div>
			</div>
		</div>
	);
}
