import { useParams } from "react-router";
import { useGetLostByIdQuery } from "../redux/api/losts/apiLostSlice";
import { skipToken } from "@reduxjs/toolkit/query";
import { useEffect, useState } from "react";
import { HDate } from "@hebcal/core";

import { CircularProgress } from "@mui/material";
import { mainContentStyle } from "../components/CSS-components";
import { useGetUserByIdQuery } from "../redux/api/users/apiUserSlice";
import { containerStyle, detailRow, labelStyle, sectionTitle, valueStyle } from "./CSS-pages";
const LostDetails = () => {
  const { id } = useParams();
  const { data: lost, isLoading, isError } = useGetLostByIdQuery(id ? id : skipToken);
  const [foreignDate, setForeignDate] = useState<string | null>(null);
  const [hebrewDate, setHebrewDate] = useState<string | null>(null);
  const { data: ownerData } = useGetUserByIdQuery(
    typeof lost?.owner === 'string' ? lost.owner : skipToken
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
    if (lost?.date) {
      dateToConvert = typeof lost.date === 'string' ? new Date(lost.date) : lost.date;
    }
    ConvertDates(dateToConvert);
  }, [lost]);
  return (
    <div style={mainContentStyle}>
      {
        isLoading ? <CircularProgress color="error" /> : isError ? <div>error...</div> : lost ? (
          <div style={containerStyle}>
            <div>
              <div style={sectionTitle}>פרטי מציאה</div>

              <div style={detailRow}><span style={labelStyle}>המציאה:</span> <span style={valueStyle}>{lost.name}</span></div>
              <div style={detailRow}><span style={labelStyle}>תאריך מציאה:</span> <span style={valueStyle}>{foreignDate}</span></div>
              <div style={detailRow}><span style={labelStyle}>תאריך עברי:</span> <span style={valueStyle}>{hebrewDate}</span></div>
              <div style={detailRow}><span style={labelStyle}>עיר:</span> <span style={valueStyle}>{lost.city}</span></div>
              <div style={detailRow}><span style={labelStyle}>רחוב:</span> <span style={valueStyle}>{lost.street}</span></div>
              <div style={detailRow}><span style={labelStyle}>קטגוריה:</span> <span style={valueStyle}>{lost.category.replace(/_/g, " ")}</span></div>

              <div style={{ ...sectionTitle, marginTop: '30px' }}> צור קשר</div>

              <div style={detailRow}><span style={labelStyle}>שם:</span> <span style={valueStyle}>{ownerData?.name || 'לא זמין'}</span></div>
              <div style={detailRow}><span style={labelStyle}>מייל:</span> <span style={valueStyle}>{ownerData?.email || 'לא קיים'}</span></div>
              <div style={detailRow}><span style={labelStyle}>טלפון:</span> <span style={valueStyle}>{ownerData?.phone || 'לא קיים'}</span></div>
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