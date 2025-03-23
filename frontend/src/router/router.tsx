import { createBrowserRouter } from "react-router";
import AppLayout from "../components/AppLayout";
import HomePage from "../components/HomePage";
import AddLost from "../pages/AddLost";
import AddFound from "../pages/AddFound";
import AllLosts from "../pages/AllLosts";
import AllFounds from "../pages/AllFounds";


const router = createBrowserRouter([{
    element: <AppLayout />,
    children: [
        {index: true, element: <HomePage />},
        {path: "addLost", element: <AddLost /> },
        {path: "addFound", element: <AddFound/>},
        {path: "allLosts", element: <AllLosts/>},
        {path: "allFounds", element: <AllFounds/>}
    ]
}])
export default router