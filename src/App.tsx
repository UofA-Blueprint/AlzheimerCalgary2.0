import { createBrowserRouter, RouterProvider } from "react-router-dom";

// routes

import ButtonTestRoute from "@/routes/ButtonTestRoute";
import ProfilePictureTest from "./routes/ProfilePictureTestRoute";
import Test from "./routes/Test";
import SearchBarTest from "./routes/SearchBarTestRoute";
import DropdownItem from "@/components/DropdownItem";
import SortDropdownListTestRoute from "@/routes/SortDropdownListTestRoute";
import NavigationTest from "@/routes/NavigationTest";
import TooltipTestRoute from "./routes/TooltipTestRoute";
import InputCodeTest from "@/routes/InputCodeTest";
import ToastTestRoute from "@/routes/ToastTestRoute";
import MediaUploadZoneTestRoute from "@/routes/MediaUploadZoneTestRoute";
import IconOptionTest from "./routes/IconOptionTest";
import { MemberTableTestRoute } from "./routes/MemberTableTestRoute";
import ColorPickerTestRoute from "@/routes/ColorPickerTestRoute";
import InputFieldTestRoute from "./routes/InputFieldTestRoute";
import MemberHeaderTestRoute from "@/routes/MemberHeaderTestRoute";
import MediaUploadStatusTestRoute from "./routes/MediaUploadStatusTestRoute";
import ImageTestRoute from "./routes/ImageTestRoute";

// components
import { MemberInformation } from "./components/MemberInformation";
import ModalTestRoute from "@/routes/ModalTestRoute";
import { LoginModal } from "./components/LoginModal";

//#endregion

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
    path: "/testButton",
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

    path:"/icon-select",
    element:<IconOptionTest/>
  },
  {
    path:"/ProfilePic",
    element:<ProfilePictureTest/>
  },{

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
		path: "/login-modal-test",
		element: (
			<div className="flex flex-col gap-y-8 justify-center items-center py-20 bg-slate-100">
				<LoginModal
					title="Admin Panel"
					type="admin"
				/>
				<LoginModal
					title="Caregiver Panel"
					type="member"
				/>
			</div>
		),
	},
	{
		path: "/member-table",
		element: <MemberTableTestRoute />,
	},
  {
    path: "/MediaUploadStatusTest",
    element: <MediaUploadStatusTestRoute />,
  },
  {
    path: "/image-overlay",
    element: <ImageTestRoute/>
  }
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
