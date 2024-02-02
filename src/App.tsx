import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Test from "./routes/Test";
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
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
