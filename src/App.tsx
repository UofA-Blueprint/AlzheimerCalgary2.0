import { createBrowserRouter, RouterProvider } from "react-router-dom";

// routes

import ButtonTestRoute from "@/routes/ButtonTestRoute";

import Test from "./routes/Test";
import DropdownItem from "@/components/DropdownItem";
import SortDropdownListTestRoute from "@/routes/SortDropdownListTestRoute";
import NavigationTest from "@/routes/NavigationTest";
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
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
