import { useParams } from "react-router";
import { useGetFoundByIdQuery } from "../redux/api/founds/apiFoundSlice";
import { skipToken } from "@reduxjs/toolkit/query";
import { Alltext, detailTitle, loginBox } from "../globalStyle";
import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { HDate } from '@hebcal/core';
import { mainContentStyle } from "../components/CSS-components";
const FoundDetails = () => {
    const { id } = useParams();
    const { data: found, isLoading, isError } = useGetFoundByIdQuery(id ? id : skipToken);
    const [foreignDate, setForeignDate] = useState<string | null>(null);
    const [hebrewDate, setHebrewDate] = useState<string | null>(null);
    const ConvertDates = (date: Date | undefined) => {
        if (date) {
          const hDate = new HDate(date);
          setForeignDate(date.toLocaleDateString());
          setHebrewDate(hDate.renderGematriya());
        } else {
          setForeignDate(null);
          setHebrewDate(null);
        }
      };
      useEffect(() => {
        let dateToConvert: Date | undefined;
        if (found?.date) {
          dateToConvert = typeof found.date === 'string' ? new Date(found.date) : found.date;
        }
        ConvertDates(dateToConvert);
      }, [found]);
return (
    <div style={mainContentStyle}>
        {
            isLoading ? <div>Loading...</div> : isError ? <div>error...</div> : found ? (
                <div style={loginBox}>
                    <div >
                        <Typography sx={detailTitle}>פרטי מציאה</Typography>
                        <Typography sx={Alltext}>המציאה: {found.name}</Typography>
                        <Typography sx={Alltext}>תאריך מציאה: {foreignDate}</Typography>
                        <Typography sx={Alltext}>תאריך עברי: {hebrewDate}</Typography>
                        <Typography sx={Alltext}>עיר:  {found.city}</Typography>
                        <Typography sx={Alltext}>רחוב:  {found.street}</Typography>
                        <Typography sx={Alltext}>קטגוריה:  {found.category}</Typography>
                        <Typography sx={detailTitle}>יצירת קשר:  </Typography>
                        <Typography sx={Alltext}>שם: {found.owner?.name}</Typography>
                        {/* <Typography sx={Alltext}> {found.identifying.map((i,index)=><label key={index}>, {i}</label>)}</Typography> */}
                    </div>
                </div>
            ) : (
                <div>Found not found.</div>
            )
        }

    </div>
);}


export default FoundDetails;