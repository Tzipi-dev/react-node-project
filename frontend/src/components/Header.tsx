import { Link, NavLink } from "react-router";
import { linkStyle, loginButtonStyle, logoStyle, navStyle, signupButtonStyle } from "./CSS-components";
import { Button } from "@mui/material";
const Header = () => {
    const loggingStyle = {
        display: 'flex',
        color: 'black',
    }
    return (
        <div>
            <nav style={navStyle}>
                <NavLink to="/" style={logoStyle}>
                    Losses & founds
                </NavLink>
                <div style={loggingStyle}>
                    <Link to="/login" style={linkStyle} >
                        <Button style={loginButtonStyle}>
                           התחבר
                        </Button>
                    </Link>
                    <Link to="/users" style={linkStyle} >
                        <Button style={signupButtonStyle}>
                            הירשם
                        </Button>
                    </Link>
                </div>
            </nav>
        </div>
    );
};
export default Header;


