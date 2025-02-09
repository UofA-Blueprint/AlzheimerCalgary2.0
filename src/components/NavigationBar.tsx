//#region Imports
import { useNavigate, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { twMerge } from "tailwind-merge";

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import logoUrl from "@/assets/images/asc_logo.svg";

import { displayToast } from "@/utils";

//#endregion

//#region Interface
interface NavigationBarProps {
	userType?: "user" | "admin";
	className?: string;
	outerDivClassName?: string;
}
//#endregion

//#region firebase
const firebaseConfig = JSON.parse(import.meta.env.VITE_FIREBASE_CONFIG);
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
//#endregion

/**
 * Represents the navigation bar component.
 * @param {object} props - The component props.
 * @param {string} props.userType - The type of user.
 * @param {string} props.className - The additional CSS class name.
 * @returns {JSX.Element} The rendered navigation bar.
 */
export function NavigationBar({
	userType = "user",
	className,
	outerDivClassName: outer = "",
}: NavigationBarProps): JSX.Element {
	const navigate = useNavigate();
	const location = useLocation(); 
	//#region Functions

	const handleLogoClick = (e: React.MouseEvent) => {
        e.preventDefault();
        // Check if current path includes '/admin'
        if (location.pathname.includes('/admin')) {
            navigate('/admin');
        } else {
            navigate('/');
        }
    };
	function signOut() {
		// Sign out logic for user
		if (userType === "user") {
			localStorage.removeItem("lastName");
			localStorage.removeItem("passcode");
			displayToast("Successfully signed out", "success");
			setTimeout(() => {
				navigate("/login");
			}, 2000);
		} else if (userType === "admin") {
			// Sign out logic for admin
			auth.signOut().then(() => {
				displayToast("Successfully signed out", "success");
				setTimeout(() => {
					navigate("/admin/login");
				}, 2000);
				navigate("/admin/login");
			});
		}
	}
	//#endregion

	return (
		<div className={twMerge("w-full z-50 sticky top-0", outer)}>
			<ToastContainer
				position="bottom-right"
				autoClose={2000}
				newestOnTop={true}
				closeButton={false}
				hideProgressBar={true}
			/>
			<nav
				className={twMerge(
					"flex h-full justify-between items-center py-2 md:py-1 px-8 md:px-16 borer border-b-2 w-full md:text-body-reg bg-white",
					className,
				)}
			>
				{/* Logo  */}
                <div onClick={handleLogoClick} className="cursor-pointer">
                    <img
                        src={logoUrl}
                        alt="ASC Logo"
                    />
                </div>
				{/* Navigation bar */}
				<div className="space-x-[40px] flex">
					{userType === "admin" ? (
						<a
							href="/admin"
							className="hover:text-primary-main hidden sm:block transition ease-in-out duration-75 font-display font-semibold"
						>
							Members
						</a>
					) : null}
					<button
						className="hover:text-primary-main transition ease-in-out duration-75 font-display font-semibold"
						onClick={signOut}
					>
						Logout
					</button>
				</div>
			</nav>
		</div>
	);
}
