//#region Imports
import { toast } from "react-toastify";
import Toast from "@/components/Toast";
import { getDocs } from "firebase/firestore";
//#endregion

/**
 * Capitalizes the first letter of each word in a string.
 */
const capitalizeSearchTerm = (term: string) => {
	const words = term.toLowerCase().split(" ");
	const capitalizedWords = words.map(
		(word) => word.charAt(0).toUpperCase() + word.slice(1),
	);
	return capitalizedWords.join(" ");
};

/**
 * Displays a toast message.
 */
const displayToast = (
	message: string,
	severity: "error" | "success" | "warning" | "info" | "neutral",
) => {
	if (!toast.isActive(severity))
		toast(
			<Toast
				message={message}
				severity={severity}
			/>,
			{
				toastId: "error",
				style: { background: "transparent", boxShadow: "none" },
			},
		);
};

/**
 * Converts a timestamp to a formatted date.
 * @param {string} timestamp - The Firebase timestamp to convert.
 * @returns The formatted date (MM/DD/YYYY).
 */
const convertTimestamp = (timestamp: string) => {
	const date = new Date(timestamp);

	const year = date.getFullYear();
	const month = date.getMonth() + 1;
	const day = date.getDate();

	const formattedDate = `${month}/${day}/${year}`;
	return formattedDate;
};
export { capitalizeSearchTerm, displayToast, convertTimestamp };
