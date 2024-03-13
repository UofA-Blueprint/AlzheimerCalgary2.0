import { createBrowserRouter, RouterProvider } from "react-router-dom";

// routes

import ButtonTestRoute from "@/routes/ButtonTestRoute";
import ProfilePictureTest from "./routes/ProfilePictureTestRoute";
import Test from "./routes/Test";
import SearchBarTest from "./routes/SearchBarTestRoute";
import DropdownItem from "@/components/DropdownItem";
import SortDropdownListTestRoute from "@/routes/SortDropdownListTestRoute";
import NavigationTest from "@/routes/NavigationTest";
import InputCodeTest from "@/routes/InputCodeTest";
import ToastTestRoute from "@/routes/ToastTestRoute";
import MediaUploadZoneTestRoute from "@/routes/MediaUploadZoneTestRoute";
import IconOptionTest from "./routes/IconOptionTest";

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
  }
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
