import { RouterProvider } from "react-router-dom";
import { router } from "./route/route";

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
