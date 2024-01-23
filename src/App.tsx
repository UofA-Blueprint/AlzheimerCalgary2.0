import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Test from "./routes/Test";

const router = createBrowserRouter([
  {
    path: "/",
    element: <>Home</>,
  },
  {
    path: "/test",
    element: <Test />,
  },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
