//#region imports
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

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

	// sign in functionality
	const signIn = () => {
		console.log("Signing in as: ", lastName);
		console.log("Passcode: ", passcode);
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
