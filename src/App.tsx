import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

// routes
import NavigaionTest from "./routes/NavigationTest";
import Test from "@/routes/Test";
import ProfilePictureTest from "./routes/ProfilePictureTestRoute";
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
    path: "/nav-test",
    element: <NavigaionTest />,
  },{
    path:"/profile-test",
    element:<ProfilePictureTest />
  }
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
