import { Dialog, DialogActions, Modal, Typography } from "@mui/material";
import { useState } from "react";
import { NavLink } from "react-router";
import LogIn from "./LogIn";

const Header = () => {
    const [isOpenModal, setOpenModal] = useState<boolean>(false);
    const navStyle = {
        display: 'flex',
        position: 'fixed',
        top: '0px',
        left: '0px',
        right: '0px',
        justifyContent: 'space-between',
        padding: '2%'
    }
    const loggingStyle = {
        display: 'flex',
        color: 'black',
    }
    const moveLeft = {
        marginLeft: '1vw'
    }
    const HandleClickLogIn = () => {
        setOpenModal(!isOpenModal)
    }
    return (
        <div>
            <nav style={navStyle}>
                <NavLink to="/">
                    <label>Losses & founds</label>
                </NavLink>
                <div style={loggingStyle}>
                    <div style={moveLeft} onClick={HandleClickLogIn}>
                        log in
                    </div>
                    <Modal open={isOpenModal}>
                        <Dialog open={isOpenModal}>
                            <DialogActions />
                            <Typography>
                                <LogIn setOpenModal={setOpenModal} />
                            </Typography>
                        </Dialog>
                    </Modal>
                    <div style={moveLeft}>|</div>
                    <div style={moveLeft}>sign up</div>
                </div>
            </nav>
        </div>
    );
};

export default Header;