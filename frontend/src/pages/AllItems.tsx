import { Link } from "react-router";
import { btnAll, btnFound, btnLost, containerOfFound, filterContainer, frameToGroupButton, item, itemdetails, resetByn } from "./CSS-pages";
import { Box, Button, Chip, Typography } from "@mui/material";
import { foundTitle, items, lostTitle, mainContentStyle } from "../components/CSS-components";
import { FaMapMarkedAlt, FaShoppingBag } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useGetAllLostsQuery } from "../redux/api/losts/apiLostSlice";
import { setAllLosts } from "../redux/slice/lostsSlice";
import { useEffect, useState } from "react";
import { useGetAllFoundsQuery } from "../redux/api/founds/apiFoundSlice";
import { setAllFounds } from "../redux/slice/foundSlice";

const AllItems = () => {
  const dispatch = useDispatch();
  const { data: GetAllLostsQuery } = useGetAllLostsQuery();
  const { data: GetAllFoundsQuery } = useGetAllFoundsQuery();
  const fetchingData = async () => {
    try {
      await dispatch(setAllLosts(GetAllLostsQuery));
      await dispatch(setAllFounds(GetAllFoundsQuery));
    }
    catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchingData();
  }, []);
  const [subject, setSubject] = useState<string>("הכל");
  const handleClick = (sub: string) => {
    setSubject(sub);
  };
  return (
    <div style={mainContentStyle}>
      <div style={filterContainer}>
        <div style={frameToGroupButton}>
            <Button variant="outlined" onClick={() => handleClick('אבדות')} sx={btnLost}>אבדות</Button>
            <Button variant="outlined" onClick={() => handleClick("מציאות")} sx={btnFound} >מציאות</Button>
            <Button variant="outlined" onClick={() => handleClick("הכל")} sx={btnAll}>הכל</Button>
        </div>
        <Button sx={resetByn} onClick={()=>handleClick("הכל")}>אפס סינון</Button>
      </div>
      {
        subject === "הכל" && <div style={containerOfFound}>
          {
            GetAllLostsQuery?.map(lost => (
              <div key={lost._id?.toString()} >
                <Link to={`/losts/${lost._id?.toString()}`}>
                  <Box sx={items}>
                    <Chip label="Lost" size="small" sx={lostTitle} />
                    <Typography mt={1} mb={1} style={item}>
                      {lost.name}
                    </Typography>
                    <Box display="flex" alignItems="cenetr" mb={0.5}>
                      <FaMapMarkedAlt style={{ color: 'grey' }} />
                      <Typography style={itemdetails}>
                        {lost.city}
                      </Typography>
                    </Box>
                    <Box display="flex" alignItems="cenetr">
                      <FaShoppingBag style={{  color: 'grey' }} />
                      <Typography style={itemdetails}>
                        {lost.category}
                      </Typography>
                    </Box>
                  </Box>
                </Link>
              </div>
            ))
          }
          {
            GetAllFoundsQuery?.map(found => (
              <div key={found._id?.toString()}>
                <Link to={`/founds/${found._id?.toString()}`}>
                  <Box
                    sx={items}
                  >
                    <Chip label="Found" size="small" sx={foundTitle} />
                    <Typography mt={1} mb={1} style={item}>
                      {found.name}
                    </Typography>
                    <Box display="flex" alignItems="center" mb={0.5}>
                      <FaMapMarkedAlt style={{  color: 'grey' }} />
                      <Typography style={itemdetails}>
                        {found.city}
                      </Typography>
                    </Box>
                    <Box display="flex" alignItems="center">
                      <FaShoppingBag style={{  color: 'grey' }} />
                      <Typography style={itemdetails}>
                        {found.category}
                      </Typography>
                    </Box>
                  </Box>
                </Link>
              </div>
            ))
          }
        </div>
      }
      {
        subject === "אבדות" &&
         <div style={containerOfFound}>
          {
            GetAllLostsQuery?.map(lost => (
              <div key={lost._id?.toString()} >
                <Link to={`/losts/${lost._id?.toString()}`}>
                  <Box sx={items}>
                    <Chip label="Lost" size="small" sx={lostTitle} />
                    <Typography  mt={1} mb={1} style={item}>
                      {lost.name}
                    </Typography>
                    <Box display="flex" alignItems="center" mb={0.5}>
                      <FaMapMarkedAlt style={{  color: 'grey' }} />
                      <Typography style={itemdetails}>
                        {lost.city}
                      </Typography>
                    </Box>
                    <Box display="flex" alignItems="center">
                      <FaShoppingBag style={{  color: 'grey' }} />
                      <Typography style={itemdetails}>
                        {lost.category}
                      </Typography>
                    </Box>
                  </Box>
                </Link>
              </div>
            ))
          }

        </div>
      }
      {
        subject === "מציאות" && <div style={containerOfFound}>

          {
            GetAllFoundsQuery?.map(found => (
              <div key={found._id?.toString()}>
                <Link to={`/founds/${found._id?.toString()}`}>
                  <Box
                    sx={items}
                  >
                    <Chip label="Found" size="small" sx={foundTitle} />
                    <Typography mt={1} mb={1} style={item}>
                      {found.name}
                    </Typography>
                    <Box display="flex" alignItems="center" mb={0.5}>
                      <FaMapMarkedAlt style={{  color: 'grey' }} />
                      <Typography style={itemdetails}>
                        {found.city}
                      </Typography>
                    </Box>
                    <Box display="flex" alignItems="center">
                      <FaShoppingBag style={{  color: 'grey' }} />
                      <Typography style={itemdetails}>
                        {found.category}
                      </Typography>
                    </Box>
                  </Box>
                </Link>
              </div>
            ))
          }
        </div>
      }

    </div>
  );
};

export default AllItems;