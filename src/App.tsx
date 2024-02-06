import { createBrowserRouter, RouterProvider } from "react-router-dom";

// routes
import NavigaionTest from "./routes/NavigationTest";
import Test from "@/routes/Test";
import ButtonTestRoute from "./routes/ButtonTestRoute";

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
    path: "/nav-test",
    element: <NavigaionTest />,
  },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
