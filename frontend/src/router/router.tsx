import { createBrowserRouter } from "react-router";
import AppLayout from "../components/AppLayout";
import HomePage from "../components/HomePage";
import AddLost from "../pages/AddLost";
import AddFound from "../pages/AddFound";
import AllLosts from "../pages/AllLosts";
import AllFounds from "../pages/AllFounds";
import LogIn from "../components/LogIn";




const router = createBrowserRouter([{
    element: <AppLayout />,
    children: [
        {index: true, element: <HomePage />},
        {path: "addLost", element: <AddLost /> },
        {path: "addFound", element: <AddFound/>},
        {path: "allLosts", element: <AllLosts/>},
        {path: "allFounds", element: <AllFounds/>},
        {path:"login",element:<LogIn/>}
        
       
    ]
}])
export default router