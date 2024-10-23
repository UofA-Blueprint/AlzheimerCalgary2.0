//#region import
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// test routes
import ButtonTestRoute from "@/routes/test/ButtonTestRoute";
import ProfilePictureTest from "./routes/test/ProfilePictureTestRoute";
import Test from "./routes/test/Test";
import SearchBarTest from "./routes/test/SearchBarTestRoute";
import SortDropdownListTestRoute from "@/routes/test/SortDropdownListTestRoute";
import NavigationTest from "@/routes/test/NavigationTest";
import TooltipTestRoute from "./routes/test/TooltipTestRoute";
import InputCodeTest from "@/routes/test/InputCodeTest";
import ToastTestRoute from "@/routes/test/ToastTestRoute";
import MediaUploadZoneTestRoute from "@/routes/test/MediaUploadZoneTestRoute";
import IconOptionTest from "./routes/test/IconOptionTest";
import ImageTestRoute from "./routes/test/ImageTestRoute";
import { MemberTableTestRoute } from "./routes/test/MemberTableTestRoute";
import ColorPickerTestRoute from "@/routes/test/ColorPickerTestRoute";
import InputFieldTestRoute from "./routes/test/InputFieldTestRoute";
import MemberHeaderTestRoute from "@/routes/test/MemberHeaderTestRoute";
import MediaUploadStatusTestRoute from "./routes/test/MediaUploadStatusTestRoute";
import ModalTestRoute from "@/routes/test/ModalTestRoute";
import GalleryTestRoute from "./routes/test/GalleryTestRoute";
import { MemberInformation } from "./components/MemberInformation";
import MemberProfilePictureTest from "@/routes/test/MemberProfilePictureTest";
import AddMemberTestRoute from "@/routes/test/AddMemberTestRoute";
import EditMemberTestRoute from "@/routes/test/EditMemberTestRoute";
import MemberPageBackgroundTestRoute from "./routes/test/MemberPageBackgroundTestRoute";

// routes
import AdminLogin from "./routes/admin/AdminLogin";
import AdminHome from "./routes/admin/AdminHome";
// import Admin

import CaregiverLogin from "./routes/caregiver/CaregiverLogin";
import MediaCardTestRoute from "./routes/test/MediaCardTestRoute";
import ConfirmationModalTestRoute from "./routes/test/ConfirmationModalTestRoute";

const router = createBrowserRouter([
	{
		path: "/test",
		element: <Test />,
	},
	{
		path: "/SearchBarTestRoute",
		element: <SearchBarTest />,
	},
	{
		path: "/button-test",
		element: <ButtonTestRoute />,
	},
	{
		path: "/SortDropdownListTestRoute",
		element: <SortDropdownListTestRoute />,
	},
	{
		path: "/nav-test",
		element: <NavigationTest />,
	},
	{
		path: "/tooltip",
		element: <TooltipTestRoute />,
	},
	{
		path: "/input-code-test",
		element: <InputCodeTest />,
	},
	{
		path: "/upload-file-test",
		element: <MediaUploadZoneTestRoute />,
	},
	{
		path: "/toast-test",
		element: <ToastTestRoute />,
	},
	{
		path: "/icon-select",
		element: <IconOptionTest />,
	},
	{
		path: "/ProfilePic",
		element: <ProfilePictureTest />,
	},
	{
		path: "/color-picker-test",
		element: <ColorPickerTestRoute />,
	},
	{
		path: "/member-header-test",
		element: <MemberHeaderTestRoute />,
	},
	{
		path: "/profile-test",
		element: <ProfilePictureTest />,
	},
	{
		path: "/member-information-test",
		element: (
			<div className="flex flex-col gap-y-20 items-center justify-center w-full h-[100vh] bg-slate-400">
				<MemberInformation />
			</div>
		),
	},
	{
		path: "/input-field-test",
		element: <InputFieldTestRoute />,
	},
	{
		path: "/modal-test",
		element: <ModalTestRoute />,
	},
	{
		path: "/member-table",
		element: <MemberTableTestRoute />,
	},
	{
		path: "/image-overlay",
		element: <ImageTestRoute />,
	},
	{
		path: "/MediaUploadStatusTest",
		element: <MediaUploadStatusTestRoute />,
	},
	{
		path: "/gallery-test",
		element: <GalleryTestRoute />,
	},
	{
		path: "/member-profile-picture-test",
		element: <MemberProfilePictureTest />,
	},
	{
		path: "/media-card-test",
		element: <MediaCardTestRoute />,
	},
	{
		path: "/confirmationModal",
		element: <ConfirmationModalTestRoute />,
	},
	{
		path: "/add-member",
		element: <AddMemberTestRoute />,
	},
	{
		path: "/edit-member",
		element: <EditMemberTestRoute />,
	},
	{
		path: "/member-background-test",
		element: <MemberPageBackgroundTestRoute />,
	},

	// Admin Routes
	{
		path: "/admin",
		element: <AdminHome />,
	},
	{
		path: "/admin/login",
		element: <AdminLogin />,
	},

	// Caregiver Routes
	{
		path: "/",
		element: (
			<div>
				<p>Caregiver Home Page</p>
			</div>
		),
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
