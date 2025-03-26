import { Link, NavLink } from "react-router";
import { CSSProperties } from 'react';
const Header = () => {
    const navStyle: CSSProperties = {
        display: 'flex',
        position: 'fixed',
        top: '0px',
        left: '0px',
        right: '0px',
        justifyContent: 'space-between',
        padding: '2%',
    };
    const loggingStyle = {
        display: 'flex',
        color: 'black',
    }
    const moveLeft = {
        marginLeft: '1vw'
    }
    return (
        <div>
            <nav style={navStyle}>
                <NavLink to="/">
                    <label>Losses & founds</label>
                </NavLink>
                <div style={loggingStyle}>
                    <Link to="/login" style={moveLeft} >
                        log in
                    </Link>
                    <div style={moveLeft}>|</div>
                    <Link to="/users" style={moveLeft} >
                        sign up.
                    </Link>
                </div>
            </nav>
        </div>
    );
};
export default Header;