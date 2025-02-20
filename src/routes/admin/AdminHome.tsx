//#region Imports
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, CaretDown } from "@phosphor-icons/react";
import { ToastContainer } from "react-toastify";
import AddMember from "@/components/AddMember";
import "react-toastify/dist/ReactToastify.css";

import { initializeApp } from "firebase/app";
import {
	getFirestore,
	collection,
	getDocs,
	query,
	orderBy,
	limit,
	startAfter,
	QueryDocumentSnapshot,
	DocumentData,
	startAt,
	endAt,
	OrderByDirection,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import { memberData } from "@/components/MemberTable";
import Button from "@/components/Button";
import { MemberTable } from "@/components/MemberTable";
import { NavigationBar } from "@/components/NavigationBar";
import SearchBar from "@/components/SearchBar";

import { displayToast, convertTimestamp } from "@/utils";
//#endregion

const MAX_MEMBER_PER_LOAD = 4;

//#region firebase
const firebaseConfig = JSON.parse(import.meta.env.VITE_FIREBASE_CONFIG);
const app = initializeApp(firebaseConfig);
const database = getFirestore(app);
const auth = getAuth(app);
const usersRef = collection(database, "users");
//#endregion

/**
 * Represents the admin home page.
 * @returns {JSX.Element} The rendered admin home page.
 */
export default function AdminHome() {
	const navigate = useNavigate();
	const [totalStorageUsed, setTotalStorageUsed] = useState<number>(0);
	const [members, setMembers] = useState<memberData[]>([]);
	const [allLoaded, setAllLoaded] = useState<boolean>(false);

	const [lastDoc, setLastDoc] = useState<
		QueryDocumentSnapshot<DocumentData, DocumentData> | undefined
	>();
	const [expanded, setExpanded] = useState<boolean>(false);

	// Sorting
	const [isSorting, setIsSorting] = useState<boolean>(false);
	const [sortBy, setSortBy] = useState<{
		[key: string]: OrderByDirection | undefined;
	}>({
		lastUpdated: "desc",
	});

	// Search
	const [searchTerm, setSearchTerm] = useState<string>("");

	// Add member modal control
	const [isAddMemberModalOpen, setIsAddMemberModalOpen] =
		useState<boolean>(false);

	//#region functions
	const fetchMembers = async () => {
		const [category, order] = Object.entries(sortBy)[0];
		// console.log("Category: ", category, "Order: ", order);
		try {
			let q;
			if (lastDoc) {
				q = await getDocs(
					query(
						usersRef,
						orderBy(category, order),
						startAfter(lastDoc),
						limit(MAX_MEMBER_PER_LOAD),
					),
				);
			} else {
				q = await getDocs(
					query(
						usersRef,
						orderBy(category, order),
						limit(MAX_MEMBER_PER_LOAD),
					),
				);
			}

			// Check if there are no more documents to load
			if (!q.empty) setLastDoc(q.docs[q.docs.length - 1]);
			else setAllLoaded(true);

			// Load member data
			const membersList: memberData[] = [];
			let storageUsed: number = totalStorageUsed;
			q.forEach((doc) => {
				storageUsed += doc.data().storageUsed;
				membersList.push({
					id: doc.id,
					profilePicture: {
						type: doc.data().profilePicture.type,
						src: doc.data().profilePicture.src,
						backgroundColor:
							doc.data().profilePicture.backgroundColor,
					},
					name: doc.data().fullName,
					storageUsed: String(doc.data().storageUsed),
					lastUpdated: String(
						convertTimestamp(doc.data().lastUpdated.toDate()),
					),
				});
			});

			if (isSorting) {
				setMembers(membersList);
				setIsSorting(false);
			} else setMembers([...members, ...membersList]);

			setIsSorting(false);
			setTotalStorageUsed(storageUsed);
		} catch (error) {
			console.error("Error fetching members: ", error);
			displayToast("Failed to load members", "error");
		}
	};

	const searchMember = async () => {
		try {
			// Check if search term is empty
			if (searchTerm === "") {
				displayToast("Please enter a search term", "info");
				return;
			}

			// Search by last name
			const q_lastName = await getDocs(
				query(
					usersRef,
					orderBy("lastName"),
					startAt(searchTerm),
					endAt(searchTerm + "\uf8ff"),
				),
			);

			// Search by full name
			const q_fullName = await getDocs(
				query(
					usersRef,
					orderBy("fullName"),
					startAt(searchTerm),
					endAt(searchTerm + "\uf8ff"),
				),
			);

			if (q_lastName.empty && q_fullName.empty) {
				displayToast("No member found", "info");
				return;
			} else {
				const membersList: memberData[] = [];
				let storageUsed: number = 0;
				const combined_q = q_lastName.docs.concat(q_fullName.docs);
				combined_q.forEach((doc) => {
					storageUsed += doc.data().storageUsed;
					membersList.push({
						id: doc.id,
						profilePicture: {
							type: doc.data().profilePicture.type,
							src: doc.data().profilePicture.src,
						},
						name: doc.data().fullName,
						storageUsed: String(doc.data().storageUsed),
						lastUpdated: String(
							convertTimestamp(doc.data().lastUpdated.toDate()),
						),
					});
				});
				setMembers(membersList);
				setTotalStorageUsed(storageUsed);
			}
		} catch (error) {
			console.error("Error searching for member: ", error);
			displayToast("Failed to searchTerm for this member", "error");
		}
	};
	//#endregion

	//#region UseEffect
	useEffect(() => {
		// Check if user is signed in
		onAuthStateChanged(auth, (user) => {
			if (!user) {
				console.log("User is not signed in");
				navigate("/admin/login");
			} else {
				fetchMembers();
			}
		});
	}, [sortBy, expanded]);

	//#endregion

	return (
		<div className="font-display relative">
			<ToastContainer
				position="bottom-right"
				autoClose={2000}
				newestOnTop={true}
				closeButton={false}
				hideProgressBar={true}
			/>

			<NavigationBar
				userType="admin"
				className="sticky top-0 left-0"
				outerDivClassName="min-h-[10%] xl:min-h-[5%]"
			/>

			<div className="mx-8 my-2 md:mx-16 md:my-4 flex flex-col">
				<div className="flex flex-row justify-between">
					<div className="flex flex-col min-w-max grow">
						<div className="text-h1">All Members</div>
						<div className="text-body-reg text-primary-dark">
							Total Storage Used: {totalStorageUsed} MB
						</div>
					</div>
					<div className="flex h-14 self-end items-center justify-end gap-4">
						<SearchBar
							placeholder="Search member"
							setSearch={setSearchTerm}
							handleClick={searchMember}
						/>

						<div className="flex flex-row h-full w-full">
							<Button
								text="Add Member"
								size="medium"
								icon={<Plus size={24} />}
								onClick={() =>
									setIsAddMemberModalOpen(true)
								}
							/>
						</div>



					</div>
				</div>

				{/* Table Section */}
				<MemberTable
					data={members}
					className="my-8"
					sortbyStorageUsed={() => {
						sortBy["storageUsed"] === "asc"
							? setSortBy({ storageUsed: "desc" })
							: setSortBy({ storageUsed: "asc" });

						setIsSorting(true);
						setLastDoc(undefined);
						setAllLoaded(false);
					}}
					sortbyLastUpdated={() => {
						sortBy["lastUpdated"] === "asc"
							? setSortBy({ lastUpdated: "desc" })
							: setSortBy({ lastUpdated: "asc" });
						setIsSorting(true);
						setLastDoc(undefined);
						setAllLoaded(false);
					}}
					isLoading={isSorting}
				/>

				{/* Load More Button */}
				<div className="w-full flex items-center justify-center">
					<button
						className={`flex items-center justify-center flex-col ${allLoaded
							? "cursor-not-allowed opacity-30"
							: "cursor-pointer"
							}`}
						onClick={() => {
							if (!allLoaded) {
								setExpanded(!expanded);
								fetchMembers();
							}
						}}
					>
						<CaretDown
							size={32}
							className="text-primary-main"
						/>
					</button>
				</div>
			</div>
			<AddMember
				isOpen={isAddMemberModalOpen}
				onClose={() => {
					setIsAddMemberModalOpen(false);
				}}
				usersRef={usersRef}
			/>
		</div>
	);
}
