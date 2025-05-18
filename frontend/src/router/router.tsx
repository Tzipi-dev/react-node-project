import { createBrowserRouter } from "react-router";
import AppLayout from "../components/AppLayout";
import HomePage from "../pages/HomePage";
import AddLost from "../pages/AddLost";
import AddFound from "../pages/AddFound";
import AllLosts from "../pages/AllLosts";
import AllFounds from "../pages/AllFounds";
import LogIn from "../components/LogIn";
import SignUp from "../components/SignUp";
import FoundDetails from "../pages/FoundDetails";
import LostDetails from "../pages/LostDetails";
import AllItems from "../pages/AllItems";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
import UserProfile from "../pages/UserProfile";
import UpdateLost from "../pages/updateLost";
import UpdateFound from "../pages/UpdateFound";
const router = createBrowserRouter([{
    element: <AppLayout />,
    children: [
        { index: true, element: <HomePage /> },
        { path: "addLost", element: <AddLost /> },
        { path: "addFound", element: <AddFound /> },
        { path: "Losts",
            children: [
            { index: true, element: <AllLosts /> },
            { path: ":id", element: <LostDetails/> },
            {path: "UpdateLost/:id", element: <UpdateLost/>}
            ]
        },
        {
            path: "Founds",
            children: [
                { index: true, element: <AllFounds /> },
                { path: ":id", element: <FoundDetails /> },
                {path: "UpdateFound/:id", element: <UpdateFound/>}
            ]
        },
        { path: "login", element: <LogIn /> },
        { path: "users", element: <SignUp /> },
        {path: "AllItems", element: <AllItems/>},
        {path:"forgot-password" , element: <ForgotPassword />},
        {path:"reset-password/:token" , element: <ResetPassword />},
        {path: "UserProfile", element: <UserProfile/>},
        

    ]
}])
export default router