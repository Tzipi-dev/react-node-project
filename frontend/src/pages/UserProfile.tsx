import { Link, NavLink } from "react-router";
import { useEffect, useState } from "react";
import { Box, Button, CircularProgress, Modal, Typography } from "@mui/material";
import {
  mainContentStyle,
  signupButtonStyle
} from "../components/CSS-components";
import {
  badgeStyle,
  cardStyle,
  containerOfFound,
  darkBrownCircleStyle,
  iconStyle,
  itemStyle,
  textRowStyle,
  titleStyle,
  updateButtonStyle,
  wrapperStyle
} from "./CSS-pages";
import { detailTitle } from "../globalStyle";
import { Found, Lost, User } from "../interfaces/models";
import { useGetFoundsByIdUserQuery } from "../redux/api/usersFound/apiUsersFoundsSlice";
import { useGetLostsByIdUserQuery } from "../redux/api/usresLost/apiUsresLostsSlice";
import { skipToken } from "@reduxjs/toolkit/query";
import { MdLocationOn, MdLock } from "react-icons/md";

const UserProfile = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [openD, setOpenDelete] = useState(false);
  const handleOpenDelete = () => setOpenDelete(true);
  const handleCloseDelete = () => setOpenDelete(false);
  const [firstLetter, setFirstLetter] = useState("א");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser") || "{}");
    const userName = user?.name || "אנונימי";
    const first = userName.charAt(0).toUpperCase();
    setFirstLetter(first);
    const res = localStorage.getItem("currentUser");
    if (res) {
      setCurrentUser(JSON.parse(res));
    } else {
     
    }
  }, []);

  const {
    data: FoundsByIdUser,
    refetch: refetchFounds,
    isLoading: isLoadingFounds,
    isError: isErrorFounds,
    isUninitialized: isUninitializedFounds // ✅ חדש
  } = useGetFoundsByIdUserQuery(currentUser?._id ?? skipToken);

  const {
    data: LostByIdUser,
    refetch: refetchLosts,
    isLoading: isLoadingLosts,
    isError: isErrorLosts,
    isUninitialized: isUninitializedLosts // ✅ חדש
  } = useGetLostsByIdUserQuery(currentUser?._id ?? skipToken);

  useEffect(() => {
    if (!isUninitializedFounds && !isUninitializedLosts) {
      refetchFounds();
      refetchLosts();
    }
  }, [isUninitializedFounds, isUninitializedLosts]);

  if (!currentUser) return <CircularProgress color="error" />;
  if (isLoadingFounds || isLoadingLosts) return <CircularProgress color="error" />;
  if (isErrorFounds || isErrorLosts) return <div>אירעה שגיאה בטעינת הנתונים</div>;

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
  };
  return (
    <div style={{ marginTop: "20vh" }}>
      <div style={mainContentStyle}>

        <div >
          <Link to="UpdateUser" >
            <div style={darkBrownCircleStyle}>
              <span >{firstLetter}</span>
            </div>
          </Link>

          <Box sx={{ display: 'flex', width: "25vw", marginRight: "50vw", marginTop: "-10vh" }}>
            <Button onClick={handleOpen} style={updateButtonStyle} sx={{ display: "block" }}>
              לעדכון אבידה או מציאה
            </Button>
            <Button onClick={handleOpenDelete} style={signupButtonStyle} sx={{ display: "block" }}>
              למחיקת אבידה או מציאה
            </Button>
          </Box>
        </div>
        <Modal open={open} onClose={handleClose}>
          <Box sx={style}>
            <div style={containerOfFound}>
              <div style={wrapperStyle}>
                {FoundsByIdUser && FoundsByIdUser.length > 0 ? (
                  FoundsByIdUser.map((found: Found) => (
                    <div key={found._id?.toString()} style={itemStyle}>
                      <NavLink to={`/Founds/UpdateFound/${found._id?.toString()}`}>
                        <div style={cardStyle}>
                          <div style={badgeStyle}>Found</div>
                          <div style={titleStyle}>{found.name}</div>
                          <div style={textRowStyle}>
                            <MdLocationOn style={iconStyle} />
                            <span>{found.city}</span>
                          </div>
                          <div style={textRowStyle}>
                            <MdLock style={iconStyle} />
                            <span>{found.category.replace(/_/g, " ")}</span>
                          </div>
                        </div>
                      </NavLink>
                    </div>
                  ))
                ) : (
                  <div style={{ color: "black", marginLeft: "8vw" }}>אין מציאות לעדכן</div>
                )}
              </div>
            </div>
            <div style={containerOfFound}>
              <div style={wrapperStyle}>
                {LostByIdUser && LostByIdUser.length > 0 ? (
                  LostByIdUser.map((lost: Lost) => (
                    <div key={lost._id?.toString()} style={itemStyle}>
                      <NavLink to={`/Losts/UpdateLost/${lost._id?.toString()}`}>
                        <div style={cardStyle}>
                          <div style={badgeStyle}>Lost</div>
                          <div style={titleStyle}>{lost.name}</div>
                          <div style={textRowStyle}>
                            <MdLocationOn style={iconStyle} />
                            <span>{lost.city}</span>
                          </div>
                          <div style={textRowStyle}>
                            <MdLock style={iconStyle} />
                            <span>{lost.category.replace(/_/g, " ")}</span>
                          </div>
                        </div>
                      </NavLink>
                    </div>
                  ))
                ) : (
                  <div style={{ color: "black", marginLeft: "8vw" }}>
                    אין אבדות לעדכן
                  </div>
                )}
              </div>
            </div>

          </Box>
        </Modal>
        <Modal open={openD} onClose={handleCloseDelete}>
          <Box sx={style}>
            <div style={containerOfFound}>
              <div style={wrapperStyle}>
                {FoundsByIdUser && FoundsByIdUser.length > 0 ? (
                  FoundsByIdUser.map((found: Found) => (
                    <div key={found._id?.toString()} style={itemStyle}>
                      <NavLink to={`/Founds/DeleteFound/${found._id?.toString()}`}>
                        <div style={cardStyle}>
                          <div style={badgeStyle}>Found</div>
                          <div style={titleStyle}>{found.name}</div>
                          <div style={textRowStyle}>
                            <MdLocationOn style={iconStyle} />
                            <span>{found.city}</span>
                          </div>
                          <div style={textRowStyle}>
                            <MdLock style={iconStyle} />
                            <span>{found.category.replace(/_/g, " ")}</span>
                          </div>
                        </div>
                      </NavLink>
                    </div>
                  ))
                ) : (
                  <div style={{ color: "black", marginLeft: "8vw" }}>אין מציאות למחוק</div>
                )}
              </div>
            </div>
            <div style={containerOfFound}>
              <div style={wrapperStyle}>
                {LostByIdUser && LostByIdUser.length > 0 ? (
                  LostByIdUser.map((lost: Lost) => (
                    <div key={lost._id?.toString()} style={itemStyle}>
                      <NavLink to={`/Losts/DeleteLost/${lost._id?.toString()}`}>
                        <div style={cardStyle}>
                          <div style={badgeStyle}>Lost</div>
                          <div style={titleStyle}>{lost.name}</div>
                          <div style={textRowStyle}>
                            <MdLocationOn style={iconStyle} />
                            <span>{lost.city}</span>
                          </div>
                          <div style={textRowStyle}>
                            <MdLock style={iconStyle} />
                            <span>{lost.category.replace(/_/g, " ")}</span>
                          </div>
                        </div>
                      </NavLink>
                    </div>
                  ))
                ) : (
                  <div style={{ color: "black", marginLeft: "8vw" }}>
                    אין אבדות למחוק
                  </div>
                )}

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
                  <div key={found._id?.toString()}>
                    <Link to={`/Founds/${found._id?.toString()}`}>
                      <div style={cardStyle}>
                        <div style={badgeStyle}>Found</div>
                        <div style={titleStyle}>{found.name}</div>
                        <div style={textRowStyle}>
                          <MdLocationOn style={iconStyle} />
                          <span>{found.city}</span>
                        </div>
                        <div style={textRowStyle}>
                          <MdLock style={iconStyle} />
                          <span>{found.category.replace(/_/g, " ")}</span>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {LostByIdUser && LostByIdUser.length > 0 && (
          <div style={{marginTop: "-30vh"}}>
            <label style={detailTitle}>:האבדות שלי</label>
            <div style={containerOfFound}>
              <div style={wrapperStyle}>
                {LostByIdUser.map((lost: Lost) => (
                  <div key={lost._id?.toString()}>
                    <Link to={`/Losts/${lost._id?.toString()}`}>
                      <div style={cardStyle}>
                        <div style={badgeStyle}>Lost</div>
                        <div style={titleStyle}>{lost.name}</div>
                        <div style={textRowStyle}>
                          <MdLocationOn style={iconStyle} />
                          <span>{lost.city}</span>
                        </div>
                        <div style={textRowStyle}>
                          <MdLock style={iconStyle} />
                          <span>{lost.category.replace(/_/g, " ")}</span>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        {!FoundsByIdUser?.length && !LostByIdUser?.length && (
          <Typography sx={{ color: "black", fontSize: "large", marginTop: "10vh" }}>אין מציאות או אבידות להצגה.</Typography>
        )}
      </div>
    </div>
  );
};
export default UserProfile;
