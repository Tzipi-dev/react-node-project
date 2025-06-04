import { useDispatch } from "react-redux"
import { useGetAllLostsQuery } from "../redux/api/losts/apiLostSlice"
import { useGetAllFoundsQuery } from "../redux/api/founds/apiFoundSlice"
import { setAllLosts } from "../redux/slice/lostsSlice"
import { setAllFounds } from "../redux/slice/foundSlice"
import { useEffect, useState } from "react"
import { Link } from "react-router"
import {  mainContentStyle, showItemsDiv, titleStyle } from "./CSS-components"
import {cardStyle, badgeStyle, containerOfFound, iconStyle, textRowStyle } from "../pages/CSS-pages"
import { Found, Lost } from "../interfaces/models"
import { MdLocationOn, MdLock } from "react-icons/md";
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
                    <Link to="/AllItems" style={{ color: "gray" }}>
                        <span>←</span>
                        <span>לכל הפריטים</span>
                    </Link>
                    <label>:פריטים מהמאגר</label>
                </div>
                {
                    <div style={containerOfFound}>
                        <div  >
                            <Link to={`/losts/${list[0]?._id?.toString()}`}>
                                <div style={cardStyle}>
                                    <div style={badgeStyle}>Lost</div>
                                    <div style={titleStyle}>{list[0]?.name}</div>
                                    <div style={textRowStyle}>
                                        <MdLocationOn style={iconStyle} />
                                        <span>{list[0]?.city}</span>
                                    </div>
                                    <div style={textRowStyle}>
                                        <MdLock style={iconStyle} />
                                        <p>{list[0]?.category.replace(/_/g, " ")}</p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                        <div  >
                            <Link to={`/losts/${list[1]?._id?.toString()}`}>
                                <div style={cardStyle}>
                                    <div style={badgeStyle}>Lost</div>
                                    <div style={titleStyle}>{list[1]?.name}</div>
                                    <div style={textRowStyle}>
                                        <MdLocationOn style={iconStyle} />
                                        <span>{list[1]?.city}</span>
                                    </div>
                                    <div style={textRowStyle}>
                                        <MdLock style={iconStyle} />
                                        <p>{list[1]?.category.replace(/_/g, " ")}</p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                        <div  >
                            <Link to={`/founds/${list[2]?._id?.toString()}`}>
                                <div style={cardStyle}>
                                    <div style={badgeStyle}>Found</div>
                                    <div style={titleStyle}>{list[2]?.name}</div>
                                    <div style={textRowStyle}>
                                        <MdLocationOn style={iconStyle} />
                                        <span>{list[2]?.city}</span>
                                    </div>
                                    <div style={textRowStyle}>
                                        <MdLock style={iconStyle} />
                                        <p>{list[2]?.category.replace(/_/g, " ")}</p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                        <Link to={`/founds/${list[3]?._id?.toString()}`}>
                            <div  >
                                <div style={cardStyle}>
                                    <div style={badgeStyle}>Found</div>
                                    <div style={titleStyle}>{list[3]?.name}</div>
                                    <div style={textRowStyle}>
                                        <MdLocationOn style={iconStyle} />
                                        <span>{list[3]?.city}</span>
                                    </div>
                                    <div style={textRowStyle}>
                                        <MdLock style={iconStyle} />
                                        <p>{list[3]?.category.replace(/_/g, " ")}</p>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                }
            </div>
        </>
    )
}

export default LastItems