//#region Imports
import { useParams } from "react-router-dom";
//#endregion

export default function AdminPage() {
	const { lastName } = useParams();

	return <div>Admin Page for patient {lastName}</div>;
}
