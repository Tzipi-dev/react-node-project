import { useParams } from "react-router";
import { useGetLostByIdQuery } from "../redux/api/losts/apiLostSlice";
import { skipToken } from "@reduxjs/toolkit/query";
import { useEffect, useState } from "react";
import { HDate } from "@hebcal/core";
import { Alltext, detailTitle, loginBox } from "../globalStyle";
import { Typography } from "@mui/material";
import { mainContentStyle } from "../components/CSS-components";
const LostDetails = () => {
  const { id } = useParams();
  const { data: lost, isLoading, isError } = useGetLostByIdQuery(id ? id : skipToken);
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
          if (lost?.date) {
            dateToConvert = typeof lost.date === 'string' ? new Date(lost.date) : lost.date;
          }
          ConvertDates(dateToConvert);
        }, [lost]);
  return (
    <div style={mainContentStyle}>
       {
            isLoading ? <div>Loading...</div> : isError ? <div>error...</div> : lost ? (
                <div style={loginBox}>
                    <div >
                        <Typography sx={detailTitle}>פרטי אבידה</Typography>
                        <Typography sx={Alltext}>תאריך מציאה: {foreignDate}</Typography>
                        <Typography sx={Alltext}>תאריך עברי: {hebrewDate}</Typography>
                        <Typography sx={Alltext}>עיר:  {lost.city}</Typography>
                        <Typography sx={Alltext}>רחוב:  {lost.street?lost.street:""}</Typography>
                        <Typography sx={Alltext}>קטגוריה:  {lost.categiry?lost.categiry:""}</Typography>
                       
                        {/* <Typography sx={detailTitle}>צור קשר</Typography>
                        <Typography sx={Alltext}>שם: {lost.owner.name}</Typography>
                        <Typography sx={Alltext}>מייל: {lost.owner.email}</Typography>
                        <Typography sx={Alltext}>טלפון: {lost.owner.phone}</Typography> */}
                        
                        
                    </div>
                </div>
            ) : (
                <div>Found not found.</div>
            )
        }

    </div>
  );
};

export default LostDetails;