import { createBrowserRouter } from "react-router";
import AppLayout from "../components/AppLayout";
import HomePage from "../components/HomePage";
import AddLost from "../pages/AddLost";
import AddFound from "../pages/AddFound";
import AllLosts from "../pages/AllLosts";
import AllFounds from "../pages/AllFounds";
import LogIn from "../components/LogIn";
import SignUp from "../components/SignUp";
import FoundDetails from "../pages/FoundDetails";




const router = createBrowserRouter([{
    element: <AppLayout />,
    children: [
        { index: true, element: <HomePage /> },
        { path: "addLost", element: <AddLost /> },
        { path: "addFound", element: <AddFound /> },
        { path: "Losts", element: <AllLosts /> },
        {
            path: "Founds",
            children: [
                { index: true, element: <AllFounds /> },
                { path: ":id", element: <FoundDetails /> }
            ]
        },
        { path: "login", element: <LogIn /> },
        { path: "users", element: <SignUp /> }


    ]
}])
export default router