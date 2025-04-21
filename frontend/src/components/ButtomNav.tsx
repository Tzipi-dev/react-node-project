import { Button } from "@mui/material"
import { CSSProperties } from "react";
import { NavLink } from "react-router";


const ButtomNav = () => {
    const navStyle: CSSProperties = {
        display: 'flex',
        position: 'fixed',
        bottom: '0px',
        left: '0px',
        right: '0px',
        justifyContent: 'space-between',
        padding: '2%',

    };
    return (
        <div>
            <nav style={navStyle}>
                <NavLink to="/addLost">
                    <Button variant="contained" disableElevation>
                        הוספת אבידה
                    </Button>
                </NavLink>
                <NavLink to="/addFound">
                <Button variant="contained" disableElevation>
                    הוספת מציאה
                </Button>
                </NavLink>
                <NavLink to="/Losts">
                <Button variant="contained" disableElevation>
                    צפיה בכל האבידות
                </Button>
                </NavLink>
                <NavLink to="/Founds">
                <Button variant="contained" disableElevation>
                    צפיה בכל המציאות
                </Button>
                </NavLink>
            </nav>
        </div>
    )
}

export default ButtomNav