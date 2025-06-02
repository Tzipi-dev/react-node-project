import { NavLink } from "react-router";
import { foundIconStyle, iconStyle, lostIconStyle, menuItemStyle, sidebarStyle } from "./CSS-components";
import { CiHome } from "react-icons/ci";
import { IoMdAdd } from "react-icons/io";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { TbListDetails } from "react-icons/tb";
import { useEffect, useState } from "react";

const ButtomNav = () => {
    const [firstLetter, setFirstLetter] = useState("א");
    ;
    const [currentUser, setcurrentUser] = useState<string | null>()
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("currentUser") || "{}");
        const userName = user?.name || "אנונימי";
        const first = userName.charAt(0).toUpperCase();
        setFirstLetter(first);
        const Cuser = localStorage.getItem("currentUser")
        setcurrentUser(Cuser)
    }, []);
    return (
        <div style={sidebarStyle}>
            <NavLink to="/" style={menuItemStyle}>
                <span style={lostIconStyle}><CiHome /></span>
                עמוד הבית
            </NavLink>
            <NavLink to="/addLost" style={menuItemStyle}>
                <span style={lostIconStyle}><IoMdAdd /></span>
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
            {currentUser && (
                <NavLink to="/UserProfile" style={menuItemStyle}>
                    <span style={iconStyle}>
                        {firstLetter}
                    </span>
                    פרופיל משתמש
                </NavLink>
            )}
        </div>
    );
};

export default ButtomNav;
