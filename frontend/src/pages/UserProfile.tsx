import { Link } from "react-router";
import { useEffect, useState } from "react";
import { Box, Chip, Typography } from "@mui/material";
import { FaMapMarkedAlt, FaShoppingBag } from "react-icons/fa";
import {
  foundTitle,
  items,
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

  return (
    <div style={mainContentStyle}>
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
