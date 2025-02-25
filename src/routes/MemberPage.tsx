import { useEffect, useState, useRef } from "react";
import { ToastContainer } from "react-toastify";
import { NavigationBar } from "@/components/NavigationBar";
import MediaGrid from "@/components/MediaGrid";
import MemberHeader from "@/components/MemberHeader";
import { useNavigate, useParams } from "react-router-dom";
import SortDropdownList from "@/components/SortDropdownList";
import {
	getFirestore,
	collection,
	getDocs,
	query,
	where,
	DocumentData,
	DocumentSnapshot,
	orderBy,
} from "firebase/firestore";
import { initializeApp } from "firebase/app";

//#region firebase
const firebaseConfig = JSON.parse(import.meta.env.VITE_FIREBASE_CONFIG);
const app = initializeApp(firebaseConfig);
const database = getFirestore(app);
const usersRef = collection(database, "users");
//#endregion

export default function MemberPage() {
	const navigate = useNavigate();
	const { id } = useParams();
	const [sortOrder, setSortOrder] = useState<
		"latest" | "oldest" | string | null
	>(localStorage.getItem("sortOrder"));
	const [userData, setUserData] = useState<DocumentData | null>(null);
	const [data, setData] = useState<Media[]>([]);
	const [masonryWidth, setMasonryWidth] = useState<number>(0);

	const masonryContainerRef = useRef<HTMLDivElement>(null);
	const fetchImages = async (id: string) => {
		const collectionRef = collection(usersRef, id, "images");
		const q = query(collectionRef, orderBy("date", sortOrder === "latest" ? "desc" : "asc"));
		const snapshot = await getDocs(q);
		const newData: Media[] = [];
		snapshot.forEach((doc: DocumentSnapshot) => {
			const docData = doc.data();
			if (docData)
				newData.push({
					src: docData.src,
					id: doc.id,
					date: docData.date.toDate(),
					caption: docData.caption,
				});
		});
		setData(newData)
	}
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
				const userDoc = querySnapshot.docs[0]; // Set retrieved user data to userData state
				if (userDoc.id != id) {
					localStorage.clear();
					navigate("/login");
				}
				setUserData(userDoc.data());
				fetchImages(userDoc.id)
			} else {
				navigate("/login"); // Redirect to login if no user matches
			}
		};


		fetchData();
	}, [navigate, sortOrder]);

	// Function to update sortOrder and close the dropdown menu
	const handleSortSelect = (order: "latest" | "oldest" | string | null) => {
		setSortOrder(order); // Update sort order (latest or oldest)
		localStorage.setItem("sortOrder", order);
	};

	useEffect(() => {
		if (masonryContainerRef.current !== null) {
			setMasonryWidth(masonryContainerRef.current.clientWidth);
		}
	}, []);

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
							profilePicture={userData.profilePicture}
							usernameExtra="text-2xl md:text-3xl lg:text-4xl"
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
					<div className="w-full" ref={masonryContainerRef}>
						<MediaGrid
							data={data}
							selectable={false}
							fullWidth={masonryWidth}
						/>
					</div>

				</div>
			</div>
		</div>
	);
}
