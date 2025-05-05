import { Link, NavLink } from "react-router";

import { linkStyle, loginButtonStyle, logoStyle, navStyle, signupButtonStyle } from "./CSS-components";
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
                        <button style={loginButtonStyle}>
                           התחבר
                        </button>
                    </Link>

                    <Link to="/users" style={linkStyle} >
                        <button style={signupButtonStyle}>
                            הירשם
                        </button>
                    </Link>
                </div>
            </nav>
        </div>
    );
};
export default Header;