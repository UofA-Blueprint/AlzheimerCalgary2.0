//#region imports
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import { LoginModal } from "@/components/LoginModal.js";
import Toast from "@/components/Toast.js";
//#endregion

//#region firebase
// Initialize Firebase
const firebaseConfig = JSON.parse(import.meta.env.VITE_FIREBASE_CONFIG);
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
//#endregion

/**
 * Admin login page
 * @returns Admin login page with authentication functionality
 */
export default function AdminLogin() {
	const navigate = useNavigate();
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");

	// sign in functionality
	const signIn = () => {
		signInWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				const user = userCredential.user;
				console.log("Signed in as: ", user.email);
				navigate("/admin");
			})
			.catch((error) => {
				console.log("Error signing in: ", error.code, error.message);
				if (!toast.isActive("error"))
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
			});
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
				title="Admin Login"
				type="admin"
				email={email}
				setEmail={setEmail}
				password={password}
				setPassword={setPassword}
				onClick={signIn}
			/>
		</div>
	);
}
