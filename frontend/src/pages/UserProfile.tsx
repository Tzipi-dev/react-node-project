import { Link, NavLink } from "react-router";
import { useEffect, useState } from "react";
import { Box, Button, Chip, Modal, Typography } from "@mui/material";
import { FaMapMarkedAlt, FaShoppingBag } from "react-icons/fa";
import {
  foundTitle,
  items,
  loginButtonStyle,
  lostTitle,
  mainContentStyle
} from "../components/CSS-components";
import {
  containerOfFound,
  itemStyle,
  wrapperStyle
} from "./CSS-pages";
import { detailTitle } from "../globalStyle";
import { Found, Lost, User } from "../interfaces/models";
import { useGetFoundsByIdUserQuery } from "../redux/api/usersFound/apiUsersFoundsSlice";
import { useGetLostsByIdUserQuery } from "../redux/api/usresLost/apiUsresLostsSlice";
import { skipToken } from "@reduxjs/toolkit/query";
const UserProfile = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  useEffect(() => {
    const res = localStorage.getItem("currentUser");
    if (res) {
      setCurrentUser(JSON.parse(res));
    } else {
      console.log("לא נמצא מידע ב-localStorage");
    }
  }, []);
  const { data: FoundsByIdUser, isLoading: isLoadingFounds, isError: isErrorFounds } = useGetFoundsByIdUserQuery(
    currentUser?._id ?? skipToken
  );
  const { data: LostByIdUser, isLoading: isLoadingLosts, isError: isErrorLosts } = useGetLostsByIdUserQuery(
    currentUser?._id ?? skipToken
  );
  if (!currentUser) {
    return <div>טוען משתמש...</div>;
  }
  if (isLoadingFounds || isLoadingLosts) {
    return <div>טוען נתונים...</div>;
  }
  if (isErrorFounds || isErrorLosts) {
    return <div>אירעה שגיאה בטעינת הנתונים</div>;
  }
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  }

  return (
    <div style={mainContentStyle}>
      <Button onClick={handleOpen} style={loginButtonStyle} sx={{ display: "block" }}>לעדכון אבידה או מציאה</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
           <div style={containerOfFound}>
            <div style={wrapperStyle}>
              {FoundsByIdUser?.map((found: Found) => (
                <div key={found._id?.toString()} style={itemStyle}>
                  <NavLink to={`/Founds/UpdateFound/${found._id?.toString()}`}>
                    <Box sx={items}>
                      <Chip label="Found" size="small" sx={foundTitle} />
                      <Typography mt={1} mb={1}>{found.name}</Typography>
                      <Box display="flex" alignItems="center" mb={0.5}>
                        <FaMapMarkedAlt style={{ marginRight: 8, color: 'grey' }} />
                        <Typography>{found.city}</Typography>
                      </Box>
                      <Box display="flex" alignItems="center">
                        <FaShoppingBag style={{ marginRight: 8, color: 'grey' }} />
                        <Typography>{found.category}</Typography>
                      </Box>
                    </Box>
                  </NavLink>
                </div>
              ))}
            </div>
          </div>
           <div style={containerOfFound}>
            <div style={wrapperStyle}>
              {LostByIdUser?.map((lost: Lost) => (
                <div key={lost._id?.toString()} style={itemStyle}>
                  <NavLink to={`/Losts/UpdateLost/${lost._id?.toString()}`}>
                    <Box sx={items}>
                      <Chip label="Lost" size="small" sx={lostTitle} />
                      <Typography mt={1} mb={1}>{lost.name}</Typography>
                      <Box display="flex" alignItems="center" mb={0.5}>
                        <FaMapMarkedAlt style={{ marginRight: 8, color: 'grey' }} />
                        <Typography>{lost.city}</Typography>
                      </Box>
                      <Box display="flex" alignItems="center">
                        <FaShoppingBag style={{ marginRight: 8, color: 'grey' }} />
                        <Typography>{lost.category}</Typography>
                      </Box>
                    </Box>
                  </NavLink>
                </div>
              ))}
            </div>
          </div>
        </Box>
      </Modal>
      {FoundsByIdUser && FoundsByIdUser.length > 0 && (
        <>

          <label style={detailTitle}>:המציאות שלי</label>
          <div style={containerOfFound}>
            <div style={wrapperStyle}>
              {FoundsByIdUser.map((found: Found) => (
                <div key={found._id?.toString()} style={itemStyle}>
                  <Link to={`/Founds/${found._id?.toString()}`}>
                    <Box sx={items}>
                      <Chip label="Found" size="small" sx={foundTitle} />
                      <Typography mt={1} mb={1}>{found.name}</Typography>
                      <Box display="flex" alignItems="center" mb={0.5}>
                        <FaMapMarkedAlt style={{ marginRight: 8, color: 'grey' }} />
                        <Typography>{found.city}</Typography>
                      </Box>
                      <Box display="flex" alignItems="center">
                        <FaShoppingBag style={{ marginRight: 8, color: 'grey' }} />
                        <Typography>{found.category}</Typography>
                      </Box>
                    </Box>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {LostByIdUser && LostByIdUser.length > 0 && (
        <>
          <label style={detailTitle}>:האבדות שלי</label>
          <div style={containerOfFound}>
            <div style={wrapperStyle}>
              {LostByIdUser.map((lost: Lost) => (
                <div key={lost._id?.toString()} style={itemStyle}>
                  <Link to={`/Losts/${lost._id?.toString()}`}>
                    <Box sx={items}>
                      <Chip label="Lost" size="small" sx={lostTitle} />
                      <Typography mt={1} mb={1}>{lost.name}</Typography>
                      <Box display="flex" alignItems="center" mb={0.5}>
                        <FaMapMarkedAlt style={{ marginRight: 8, color: 'grey' }} />
                        <Typography>{lost.city}</Typography>
                      </Box>
                      <Box display="flex" alignItems="center">
                        <FaShoppingBag style={{ marginRight: 8, color: 'grey' }} />
                        <Typography>{lost.category}</Typography>
                      </Box>
                    </Box>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* אפשר להוסיף גם הודעה אם אין תוצאות בכלל */}
      {!FoundsByIdUser?.length && !LostByIdUser?.length && (
        <Typography>אין מציאות או אבידות להצגה.</Typography>
      )}

    </div>
  );
};

export default UserProfile;
