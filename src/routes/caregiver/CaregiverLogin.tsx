//#region imports
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { initializeApp } from "firebase/app";
import {
	getFirestore,
	collection,
	where,
	getDocs,
	query,
} from "firebase/firestore";

import { LoginModal } from "@/components/LoginModal";
import Toast from "@/components/Toast.js";
//#endregion

//#region firebase
// Initialize Firebase
const firebaseConfig = JSON.parse(import.meta.env.VITE_FIREBASE_CONFIG);
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const database = getFirestore(app);
//#endregion

export default function CaregiverLogin() {
	const navigate = useNavigate();
	const [lastName, setLastName] = useState<string>("");
	const [passcode, setPasscode] = useState<Record<number, string>>({
		0: "",
		1: "",
		2: "",
		3: "",
		4: "",
		5: "",
	});

	// Sign in functionality
	const signIn = async () => {
		const userLastName = lastName.trim();
		const userPasscode = Object.values(passcode).join("");

		const q = query(
			collection(database, "users"),
			where("lastName", "==", userLastName),
			where("passcode", "==", userPasscode),
		);

		const user = await getDocs(q);

		// User found
		if (user.docs.length > 0) {
			console.log("Signed in as: ", user.docs[0].data().lastName);
			navigate("/");
		}

		// User not found
		else {
			console.log("Username", userLastName, "not found.");
			toast(
				<Toast
					message="Failed to log in."
					severity="error"
				/>,
				{
					toastId: "error",
					style: {
						background: "transparent",
						boxShadow: "none",
					},
				},
			);
		}
	};

	return (
		<div className="flex items-center justify-center h-screen bg-slate-100">
			<ToastContainer
				position="bottom-right"
				autoClose={2000}
				newestOnTop={true}
				closeButton={false}
				hideProgressBar={true}
			/>
			<LoginModal
				title="Caregiver Panel"
				type="member"
				setLastName={setLastName}
				setPasscode={setPasscode}
				onClick={signIn}
			/>
		</div>
	);
}
