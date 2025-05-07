import { useDispatch } from "react-redux"
import { useGetAllFoundsQuery } from "../redux/api/founds/apiFoundSlice"
import { setAllFounds } from "../redux/slice/foundSlice";
import { useEffect } from "react";
import Typography from '@mui/joy/Typography';
import { Link } from "react-router";
import { foundTitle, items, mainContentStyle } from "../components/CSS-components";
import { Box, Chip } from "@mui/material";
import { FaMapMarkedAlt, FaShoppingBag } from "react-icons/fa";
import { containerOfFound } from "./CSS-pages";
const AllFounds = () => {
  const dispatch = useDispatch()
  const { data: GetAllFoundsQuery, isError, isLoading } = useGetAllFoundsQuery();
  useEffect(() => {
    fetchingData()
    console.log(GetAllFoundsQuery);
  }, [])
  const fetchingData = async () => {
    try {
      await dispatch(setAllFounds(GetAllFoundsQuery))
    }
    catch (error) {
      console.error(error)
    }
  }
  return (
    <div style={mainContentStyle}>
      {
        isLoading ? (<div>Loading...</div>) :
          isError ? (<div>{isError}</div>) :
            (
              <div style={containerOfFound}>
                {
                  GetAllFoundsQuery?.map(found => (
                    <div key={found._id?.toString()}>
                      <Link to={`/Founds/${found._id?.toString()}`}>
                        <Box
                          sx={items}
                        >
                          <Chip label="Found" size="small" sx={foundTitle} />
                          <Typography  mt={1} mb={1}>
                            {found.name}
                          </Typography>
                          <Box display="flex" alignItems="center" mb={0.5}>
                            <FaMapMarkedAlt style={{ marginRight: 8, color: 'grey' }} />
                            <Typography  >
                              {found.city}
                            </Typography>
                          </Box>
                          <Box display="flex" alignItems="center">
                            <FaShoppingBag style={{ marginRight: 8, color: 'grey' }} />
                            <Typography >
                              {found.category}
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
export default AllFounds