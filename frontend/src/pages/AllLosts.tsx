import { useDispatch } from "react-redux"
import { useGetAllLostsQuery } from "../redux/api/losts/apiLostSlice"
import { setAllLosts } from "../redux/slice/lostsSlice"
import { useEffect } from "react"

import Typography from '@mui/joy/Typography';
import { Link } from "react-router";
import { items, lostTitle, mainContentStyle } from "../components/CSS-components";
import { containerOfFound } from "./CSS-pages";
import { Box, Chip } from "@mui/material";
import { FaMapMarkedAlt, FaShoppingBag } from "react-icons/fa";
const AllLosts = () => {
  const dispatch = useDispatch()
  const { data: GetAllLostsQuery, isError, isLoading } = useGetAllLostsQuery()

  const fetchingData = async () => {
    try {
      await dispatch(setAllLosts(GetAllLostsQuery))
    }
    catch (error) {
      console.error(error)
    }
  }
  useEffect(()=>{
    fetchingData();
  
  },[])

  return (

    <div style={mainContentStyle}>
      {
        isLoading ? (<div>Loading...</div>) :
          isError ? (<div>{isError}</div>) :
            (
              <div style={containerOfFound}>
                {
                  GetAllLostsQuery?.map(lost => (
                    <div key={lost._id?.toString()}>
                      <Link to={`/losts/${lost._id?.toString()}`}>
                      <Box
                          sx={items}
                        >
                          <Chip label="Lost" size="small" sx={lostTitle} />
                          <Typography  mt={1} mb={1}>
                            {lost.name}
                          </Typography>
                          <Box display="flex" alignItems="center" mb={0.5}>
                            <FaMapMarkedAlt style={{ marginRight: 8, color: 'grey' }} />
                            <Typography  >
                              {lost.city}
                            </Typography>
                          </Box>
                          <Box display="flex" alignItems="center">
                            <FaShoppingBag style={{ marginRight: 8, color: 'grey' }} />
                            <Typography >
                              {lost.category}
                            </Typography>
                          </Box>
                        </Box>
              </Link>
                    </div>
                  ))
                }
              </div>
            )

      }
    </div>
  )
}

export default AllLosts