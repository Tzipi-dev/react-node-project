import { Dialog, DialogActions, Modal } from "@mui/material";
import { useState } from "react";
import { NavLink } from "react-router";
import LogIn from "./LogIn";
import { CSSProperties } from 'react';
import SignUp from "./SignUp";
const Header = () => {
    const [isOpenModal, setOpenModal] = useState<boolean>(false);
    const [isSignUpOpen, setSignUpModal]=useState<boolean>(false)

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
    const HandleClickLogIn = () => {
        setOpenModal(!isOpenModal)
    }
    const HandleClickSignUp=()=>{
        setSignUpModal(!isSignUpOpen)
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
                            <div>
                                <LogIn setOpenModal={setOpenModal} />
                            </div>
                        </Dialog>
                    </Modal>
                    <div style={moveLeft}>|</div>
                    <div style={moveLeft} onClick={HandleClickSignUp}>sign up</div>
                    <Modal open={isSignUpOpen}>
                        <Dialog open={isSignUpOpen}>
                            <DialogActions />
                            <div>
                                <SignUp setSignUpModal={setSignUpModal} />
                            </div>
                        </Dialog>
                    </Modal>
                </div>
            </nav>
        </div>
    );
};

export default Header;