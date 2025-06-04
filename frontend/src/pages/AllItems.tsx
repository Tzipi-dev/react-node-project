import { Link } from "react-router";
import { badgeStyle, btnAll, btnFound, btnLost, cardStyle, containerOfFound, filterContainer, frameToGroupButton, iconStyle,  resetByn, textRowStyle, titleStyle } from "./CSS-pages";
import {  Button } from "@mui/material";
import {  mainContentStyle } from "../components/CSS-components";

import { useDispatch } from "react-redux";
import { useGetAllLostsQuery } from "../redux/api/losts/apiLostSlice";
import { setAllLosts } from "../redux/slice/lostsSlice";
import { useEffect, useState } from "react";
import { useGetAllFoundsQuery } from "../redux/api/founds/apiFoundSlice";
import { setAllFounds } from "../redux/slice/foundSlice";
import { MdLocationOn, MdLock } from "react-icons/md";

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
        <Button sx={resetByn} onClick={() => handleClick("הכל")}>אפס סינון</Button>
      </div>
      {
        subject === "הכל" && <div style={containerOfFound}>
          {
            GetAllLostsQuery?.map(lost => (
              <div key={lost._id?.toString()} >
                <Link to={`/losts/${lost._id?.toString()}`}>
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
            ))
          }
          {
            GetAllFoundsQuery?.map(found => (
              <div key={found._id?.toString()}>
                <Link to={`/founds/${found._id?.toString()}`}>
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
            ))
          }
        </div>
      }

    </div>
  );
};

export default AllItems;