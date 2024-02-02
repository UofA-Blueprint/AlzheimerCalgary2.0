//#region Imports
import { twMerge } from "tailwind-merge";
//#endregion

//#region Interface
interface NavigationBarProps {
  userType?: string;
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
export default function NavigationBar({
  userType = "user",
  className,
}: NavigationBarProps): JSX.Element {
  return (
    <nav
      className={twMerge(
        "flex justify-between font-body my-8 md:my-8",
        className
      )}
    >
      {/* Logo  */}
      <a href="/">
        <img
          src="src/assets/images/asc_logo.svg"
          alt="ASC Logo"
        />
      </a>

      {/* Navigation bar */}
      <div className="space-x-[40px]">
        {userType === "admin" ? (
          <a
            href="/dashboard"
            className="hover:text-primary-main transition ease-in-out duration-75"
          >
            Members
          </a>
        ) : null}
        <button
          className="hover:text-primary-main transition ease-in-out duration-75"
          onClick={signOut}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}