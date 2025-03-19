import { createBrowserRouter } from "react-router";
import AppLayout from "../components/AppLayout";
import HomePage from "../components/HomePage";
import AddLost from "../components/AddLost";
import AddFound from "../components/AddFound";
import AllLosts from "../components/AllLosts";
import AllFounds from "../components/AllFounds";


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