
import { NavLink } from "react-router";
import { foundIconStyle, lostIconStyle, menuItemStyle, sidebarStyle } from "./CSS-components";
import { CiHome } from "react-icons/ci";
import { IoMdAdd } from "react-icons/io";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoBody } from "react-icons/io5";
import { TbListDetails } from "react-icons/tb";
const ButtomNav = () => {
   
    return (
        <div style={sidebarStyle}>
            <NavLink to="/" style={menuItemStyle}>
                <span style={lostIconStyle}><CiHome/></span>
                עמוד הבית
            </NavLink>
            <NavLink to="/addLost" style={menuItemStyle}>
                <span style={lostIconStyle} ><IoMdAdd /></span>
                הוספת אבידה
            </NavLink>
            <NavLink to="/addFound" style={menuItemStyle}>
                <span style={foundIconStyle}><IoMdAdd /></span>
                הוספת מציאה
            </NavLink>
            <NavLink to="/Losts" style={menuItemStyle}>
                <span style={{ marginRight: "0.5rem", color: "darkred" }}><FaMagnifyingGlass /></span>
                צפיה בכל האבידות
            </NavLink>
            <NavLink to="/Founds" style={menuItemStyle}>
                <span style={{ marginRight: "0.5rem", color: "darkolivegreen" }}><FaMagnifyingGlass /></span>
                צפיה בכל המציאות
            </NavLink>
            <NavLink to="/AllItems" style={menuItemStyle}>
                <span style={{ marginRight: "0.5rem", color: "darkred" }}><TbListDetails /></span>
                צפיה בכל הפריטים
            </NavLink>
            <NavLink to="/UserProfile" style={menuItemStyle}>
                <span style={{ marginRight: "0.5rem", color: "darkolivegreen" }}><IoBody /></span>
               פרופיל משתמש
            </NavLink>
        </div>
    )
}

export default ButtomNav