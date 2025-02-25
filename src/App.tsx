//#region import
import { createBrowserRouter, RouterProvider } from "react-router-dom";


// routes
// Admin
import AdminLogin from "./routes/admin/AdminLogin";
import AdminHome from "./routes/admin/AdminHome";
import AdminMemberPage from "./routes/admin/AdminMemberPage";

// User page
import CaregiverLogin from "./routes/caregiver/CaregiverLogin";
import MemberPage from "./routes/MemberPage";

const router = createBrowserRouter([
	// Admin Routes
	{
		path: "/admin",
		element: <AdminHome />,
	},
	{
		path: "/admin/login",
		element: <AdminLogin />,
	},
	{
		path: "/admin/members/:id",
		element: <AdminMemberPage />,
	},

	// Caregiver Routes
	{
		path: "/",
		element: <MemberPage />
	},
	{
		path: "/members/:id",
		element: <MemberPage />
	},
	{
		path: "/login",
		element: <CaregiverLogin />,
	},
]);

function App() {
	return <RouterProvider router={router}></RouterProvider>;
}

export default App;
