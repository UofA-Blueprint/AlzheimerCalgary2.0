import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

// routes

import ButtonTestRoute from "@/routes/ButtonTestRoute";
import ProfilePictureTest from "./routes/ProfilePictureTestRoute";
import Test from "./routes/Test";
import DropdownItem from "@/components/DropdownItem";
import SortDropdownListTestRoute from "@/routes/SortDropdownListTestRoute";
import NavigationTest from "@/routes/NavigationTest";
import ToastTestRoute from "@/routes/ToastTestRoute";
import MediaUploadZoneTestRoute from "@/routes/MediaUploadZoneTestRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <>Home</>,
  },
  {
    path: "/test",
    element: <Test />,
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
    path: "/upload-file-test",
    element: <MediaUploadZoneTestRoute />,
  },
  {

    path: "/toast-test",
    element: <ToastTestRoute />,
  },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
