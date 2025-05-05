
import { NavLink } from "react-router";
import { foundIconStyle, lostIconStyle, menuItemStyle, sidebarStyle } from "./CSS-components";


const ButtomNav = () => {
   
    return (
        <div style={sidebarStyle}>
            <NavLink to="/" style={menuItemStyle}>
                <span style={lostIconStyle}>🏠</span>
                עמוד הבית
            </NavLink>
            <NavLink to="/addLost" style={menuItemStyle}>
                <span style={lostIconStyle} >➕</span>
                הוספת אבידה
            </NavLink>
            <NavLink to="/addFound" style={menuItemStyle}>
                <span style={foundIconStyle}>🔍</span>
                הוספת מציאה
            </NavLink>
            <NavLink to="/Losts" style={menuItemStyle}>
                <span style={{ marginRight: "0.5rem", color: "darkred" }}>📜</span>
                צפיה בכל האבידות
            </NavLink>
            <NavLink to="/Founds" style={menuItemStyle}>
                <span style={{ marginRight: "0.5rem", color: "darkolivegreen" }}>📜</span>
                צפיה בכל המציאות
            </NavLink>
        </div>
    )
}

export default ButtomNav