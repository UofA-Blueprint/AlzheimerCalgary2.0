import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Test from "./routes/Test";
import DropdownItem from "./components/DropdownItem";
import SortDropdownListTestRoute from "./routes/SortDropdownListTestRoute";

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
    path: "/SortDropdownListTestRoute",
    element: <SortDropdownListTestRoute />,
  },

]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
