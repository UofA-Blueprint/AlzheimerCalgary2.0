//#region Imports
import { twMerge } from "tailwind-merge";
import logoUrl from "@/assets/images/asc_logo.svg";
//#endregion

//#region Interface
interface NavigationBarProps {
	/**
	 * The type of user.
	 * - "user" for regular users.
	 * - "admin" for admin users.
	 */
	userType?: "user" | "admin";
	className?: string;
}
//#endregion

//#region Functions
function signOut() {
	// TODO: Implement sign out logic
	console.log("Signed out");
}
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
}: NavigationBarProps): JSX.Element {
	return (
		<nav
			className={twMerge(
				"flex justify-between items-center py-2 md:py-1 px-8 md:px-16 borer border-b-2 w-full md:text-body-reg bg-white",
				className,
			)}
		>
			{/* Logo  */}
			<a href="/">
				<img
					src={logoUrl}
					alt="ASC Logo"
				/>
			</a>

			{/* Navigation bar */}
			<div className="space-x-[40px] flex">
				{userType === "admin" ? (
					<a
						href="/dashboard"
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
	);
}
