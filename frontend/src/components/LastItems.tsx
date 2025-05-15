import { useDispatch } from "react-redux"
import { useGetAllLostsQuery } from "../redux/api/losts/apiLostSlice"
import { useGetAllFoundsQuery } from "../redux/api/founds/apiFoundSlice"
import { setAllLosts } from "../redux/slice/lostsSlice"
import { setAllFounds } from "../redux/slice/foundSlice"
import { useEffect, useState } from "react"
import { Link } from "react-router"
import { Box, Chip, Typography } from "@mui/material"
import {  foundTitle, items, lostTitle, mainContentStyle, showItemsDiv } from "./CSS-components"
import { containerOfFound, item, itemdetails } from "../pages/CSS-pages"
import { FaMapMarked, FaShoppingBag } from "react-icons/fa"
import { Found, Lost } from "../interfaces/models"
const LastItems = () => {
    const dispatch = useDispatch()
    const { data: GetAllLostsQuery } = useGetAllLostsQuery()
    const { data: GetAllFoundsQuery } = useGetAllFoundsQuery()
    const [list, setList] = useState<Array<Found | Lost | undefined>>([])
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
    useEffect(() => {
        const lostItem0 = GetAllLostsQuery && GetAllLostsQuery[0];
        const lostItem1 = GetAllLostsQuery && GetAllLostsQuery[1];
        const foundItem0 = GetAllFoundsQuery && GetAllFoundsQuery[0];
        const foundItem1 = GetAllFoundsQuery && GetAllFoundsQuery[1];
        setList([lostItem0, lostItem1, foundItem0, foundItem1])
    }, [GetAllLostsQuery, GetAllFoundsQuery])
    
    return (
        <>
            <div style={mainContentStyle}>
                <div style={showItemsDiv}>
                    <Link to="/AllItems" style={{color: "gray"}}>
                    <span>←</span>
                    <span>לכל הפריטים</span>
                    </Link>
                   
                    <label>:פריטים מהמאגר</label>
                </div>
                {
                    <div style={containerOfFound}>
                        <div  >
                            <Link to={`/losts/${list[0]?._id?.toString()}`}>
                                <Box sx={items}>
                                    <Chip label="Lost" size="small" sx={lostTitle} />
                                    <Typography mt={1} mb={1} style={item}>
                                        {list[0]?.name}
                                    </Typography>
                                    <Box display="flex" alignItems="right" mb={0.5}>
                                        <FaMapMarked style={{ marginRight: 8, color: 'grey' }} />
                                        <Typography style={itemdetails}>
                                            {list[0]?.city}
                                        </Typography>
                                    </Box>
                                    <Box display="flex" alignItems="right">
                                        <FaShoppingBag style={{ marginRight: 8, color: 'grey' }} />
                                        <Typography style={itemdetails}>
                                            {list[0]?.category}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Link>
                        </div>
                        <div  >
                            <Link to={`/losts/${list[1]?._id?.toString()}`}>
                                <Box sx={items}>
                                    <Chip label="Lost" size="small" sx={lostTitle} />
                                    <Typography mt={1} mb={1} style={item}>
                                        {list[1]?.name}
                                    </Typography>
                                    <Box display="flex" alignItems="right" mb={0.5}>
                                        <FaMapMarked style={{ marginRight: 8, color: 'grey' }} />
                                        <Typography style={itemdetails}>
                                            {list[1]?.city}
                                        </Typography>
                                    </Box>
                                    <Box display="flex" alignItems="right">
                                        <FaShoppingBag style={{ marginRight: 8, color: 'grey' }} />
                                        <Typography style={itemdetails}>
                                            {list[1]?.category}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Link>
                        </div>
                        <div  >
                            <Link to={`/founds/${list[2]?._id?.toString()}`}>
                                <Box sx={items}>
                                    <Chip label="Found" size="small" sx={foundTitle} />
                                    <Typography mt={1} mb={1} style={item}>
                                        {list[2]?.name}
                                    </Typography>
                                    <Box display="flex" alignItems="right" mb={0.5}>
                                        <FaMapMarked style={{ marginRight: 8, color: 'grey' }} />
                                        <Typography style={itemdetails}>
                                            {list[2]?.city}
                                        </Typography>
                                    </Box>
                                    <Box display="flex" alignItems="right">
                                        <FaShoppingBag style={{ marginRight: 8, color: 'grey' }} />
                                        <Typography style={itemdetails}>
                                            {list[2]?.category}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Link>
                        </div>
                        <div  >
                            <Link to={`/founds/${list[3]?._id?.toString()}`}>
                                <Box sx={items}>
                                    <Chip label="Found" size="small" sx={foundTitle} />
                                    <Typography mt={1} mb={1} style={item}>
                                        {list[3]?.name}
                                    </Typography>
                                    <Box display="flex" alignItems="right" mb={0.5}>
                                        <FaMapMarked style={{ marginRight: 8, color: 'grey' }} />
                                        <Typography style={itemdetails}>
                                            {list[3]?.city}
                                        </Typography>
                                    </Box>
                                    <Box display="flex" alignItems="right">
                                        <FaShoppingBag style={{ marginRight: 8, color: 'grey' }} />
                                        <Typography style={itemdetails}>
                                            {list[3]?.category}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Link>
                        </div>
                    </div>
                }
               
            </div>
        </>
    )
}

export default LastItems