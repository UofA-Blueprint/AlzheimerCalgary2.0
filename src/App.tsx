import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Test from "./routes/Test";
import SearchBarTest from "./routes/SearchBarTestRoute";

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
    path:"/SearchBarTestRoute",
    element: <SearchBarTest />
  }
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
