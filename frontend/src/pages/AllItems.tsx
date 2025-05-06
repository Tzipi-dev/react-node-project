import { Link } from "react-router"
import { containerOfFound, filterContainer, item, itemdetails } from "./CSS-pages"
import { Box, Chip, Typography } from "@mui/material"
import { foundTitle, items, lostTitle, mainContentStyle } from "../components/CSS-components"
import { FaMapMarkedAlt, FaShoppingBag } from "react-icons/fa"
import { useDispatch } from "react-redux"
import { useGetAllLostsQuery } from "../redux/api/losts/apiLostSlice"
import { setAllLosts } from "../redux/slice/lostsSlice"
import { useEffect } from "react"
import { useGetAllFoundsQuery } from "../redux/api/founds/apiFoundSlice"
import { setAllFounds } from "../redux/slice/foundSlice"
const AllItems = () => {
    const dispatch = useDispatch()
    const { data: GetAllLostsQuery } = useGetAllLostsQuery()
    const { data: GetAllFoundsQuery } = useGetAllFoundsQuery()
    const fetchingData = async () => {
        try {
            await dispatch(setAllLosts(GetAllLostsQuery))
            await dispatch(setAllFounds(GetAllFoundsQuery))
        }
        catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        fetchingData();
    }, [])
    return (
        <div style={mainContentStyle}>
            <div style={filterContainer}></div>

            <div style={containerOfFound}>
                {
                    GetAllLostsQuery?.map(lost => (
                        <div key={lost._id?.toString()} >
                            <Link to={`/losts/${lost._id?.toString()}`}>
                                <Box sx={items}>
                                    <Chip label="Lost" size="small" sx={lostTitle} />
                                    <Typography mt={1} mb={1} style={item}>
                                        {lost.name}
                                    </Typography>
                                    <Box display="flex" alignItems="right" mb={0.5}>
                                        <FaMapMarkedAlt style={{ marginRight: 8, color: 'grey' }} />
                                        <Typography style={itemdetails}>
                                            {lost.city}
                                        </Typography>
                                    </Box>
                                    <Box display="flex" alignItems="right">
                                        <FaShoppingBag style={{ marginRight: 8, color: 'grey' }} />
                                        <Typography style={itemdetails}>
                                            {lost.categiry}
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
                                        <FaMapMarkedAlt style={{ marginRight: 8, color: 'grey' }} />
                                        <Typography style={itemdetails}>
                                            {found.city}
                                        </Typography>
                                    </Box>
                                    <Box display="flex" alignItems="center">
                                        <FaShoppingBag style={{ marginRight: 8, color: 'grey' }} />
                                        <Typography style={itemdetails}>
                                            {found.categiry}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Link>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default AllItems