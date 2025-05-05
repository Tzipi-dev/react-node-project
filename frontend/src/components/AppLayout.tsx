import { Outlet } from "react-router"
import Header from "./Header"
import ButtomNav from "./ButtomNav"


const AppLayout = () => {
  return (
    <>
    <Header/>
    <Outlet/>
    <ButtomNav/>
    </>
  )
}

export default AppLayout