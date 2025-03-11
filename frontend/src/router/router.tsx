import { createBrowserRouter } from "react-router";
import AppLayout from "../components/AppLayout";
import HomePage from "../components/HomePage";


const router = createBrowserRouter([{
    element: <AppLayout />,
    children: [
        {
            index: true,
            element: <HomePage/>
        }
    ]
}])
export default router