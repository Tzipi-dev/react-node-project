import { useParams } from "react-router";
import { useGetFoundByIdQuery } from "../redux/api/founds/apiFoundSlice";
import { skipToken } from "@reduxjs/toolkit/query";
import { Alltext, detailTitle, loginBox } from "../globalStyle";
import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { HDate } from '@hebcal/core';
import { mainContentStyle } from "../components/CSS-components";
import { useGetUserByIdQuery } from "../redux/api/users/apiUserSlice";
const FoundDetails = () => {
  const { id } = useParams();
  const { data: found, isLoading, isError } = useGetFoundByIdQuery(id ? id : skipToken);
  const [foreignDate, setForeignDate] = useState<string | null>(null);
  const [hebrewDate, setHebrewDate] = useState<string | null>(null);
  const { data: ownerData } = useGetUserByIdQuery(
    typeof found?.owner === 'string' ? found.owner : skipToken
  );
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
              <Typography sx={detailTitle}>צור קשר</Typography>
              <Typography sx={Alltext}>שם: {ownerData?.name || 'לא זמין'}</Typography>
              <Typography sx={Alltext} > {ownerData?.email || 'לא קיים'} :מייל</Typography>
              <Typography sx={Alltext}>טלפון: {ownerData?.phone || 'לא קיים'}</Typography>
            </div>
          </div>
        ) : (
          <div>Found not found.</div>
        )
      }

    </div>
  );
}


export default FoundDetails;