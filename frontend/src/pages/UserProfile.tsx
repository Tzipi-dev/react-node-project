import { Link } from "react-router";
import { foundTitle, items, mainContentStyle } from "../components/CSS-components";
import { detailTitle } from "../globalStyle";
import { useGetAllFoundsQuery } from "../redux/api/founds/apiFoundSlice";
import { useGetAllLostsQuery } from "../redux/api/losts/apiLostSlice";
import { containerOfFound, itemStyle, wrapperStyle } from "./CSS-pages";
import { Box, Chip, Typography } from "@mui/material";
import { FaMapMarkedAlt, FaShoppingBag } from "react-icons/fa";
import { Found, Lost } from "../interfaces/models";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../redux/slice/currentuser";
import { setAllLosts } from "../redux/slice/lostsSlice";
import { useEffect } from "react";
import { setAllFounds } from "../redux/slice/foundSlice";
const UserProfile = () => {
  const { data: GetAllFoundsQuery } = useGetAllFoundsQuery();
  const { data: GetAllLostsQuery } = useGetAllLostsQuery();
  const currentUser = useSelector(selectCurrentUser);
  const userFounds = GetAllFoundsQuery?.filter((found: Found) => found.owner?._id === currentUser?._id) || [];
  const userLosts = GetAllLostsQuery?.filter((lost: Lost) => lost.owner === currentUser) || [];
  const dispatch=useDispatch()
   const fetchingData = async () => {
     try {
       await dispatch(setAllLosts(GetAllLostsQuery));
       await dispatch(setAllFounds(GetAllFoundsQuery))
     } catch (error) {
       console.error(error);
     }
   };
 useEffect(()=>{
  fetchingData()
 },[])
  return (
    <div>
      <div style={mainContentStyle}>
        {/* המציאות שלי */}
        {userFounds.length > 0 && (
          <>
            <label style={detailTitle}>:המציאות שלי</label>
            <div style={containerOfFound}>
              <div style={wrapperStyle}>
                {userFounds.map((found: Found) => (
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
        {/* האבדות שלי */}
        {userLosts.length > 0 && (
          <>
            <label style={detailTitle}>:האבדות שלי</label>
            <div style={containerOfFound}>
              <div style={wrapperStyle}>
                {userLosts.map((lost: Lost) => (
                  <div key={lost._id?.toString()} style={itemStyle}>
                    <Link to={`/Losts/${lost._id?.toString()}`}>
                      <Box sx={items}>
                        <Chip label="Lost" size="small" sx={foundTitle} />
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
      </div>
    </div>
  );
};

export default UserProfile;
