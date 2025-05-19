import { CSSProperties } from 'react';

export const brownContainerStyle: CSSProperties = {
  backgroundColor: '#795548', /* גוון חום כמו בתמונה */
  color: '#fff', /* צבע טקסט לבן */
  padding: '1rem', /* ריווח פנימי קטן יותר */
  borderRadius: '0.5vw', /* פינות מעוגלות */
  top: '13vh', /* ממקם אותו בחלק העליון */
  transform: 'translateX(-50%)', /* מרכז אותו בדיוק אופקית */
  zIndex: 1000, /* מבטיח שהוא יהיה מעל תוכן אחר */
  flexDirection: 'column',
  gap: '0.5rem', /* מרווח קטן יותר בין השורות */
  alignItems: 'right', /* יישור הטקסט והכפתורים למרכז */
  textAlign: 'right', /* יישור טקסט במרכז */
  width: '80%', /* רוחב הבאנר */
  // maxWidth: '70vw', /* רוחב מקסימלי */
  marginTop: '12vh',
  marginLeft: "50vw"
};
export const buttonsContainerStyle: CSSProperties = {
  display: 'flex',
  gap: '1rem',
};
export const reportLostButtonStyle: CSSProperties = {
  backgroundColor: '#d32f2f', /* צבע אדום לכפתור "Lost" */
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  padding: '0.7rem 1.5rem',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
};

export const reportFoundButtonStyle: CSSProperties = {
  backgroundColor: 'transparent',
  color: '#fff',
  border: '1px solid #fff',
  borderRadius: '5px',
  padding: '0.7rem 1.5rem',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
};
export const containerOfFound: CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  gap: '16px', // זה יצור רווח אחיד בין הפריטים (אופקית ואנכית)
  width: '100%',
}
export const item: CSSProperties = {
  fontFamily: "Segoe UI, sans-serif",
  fontWeight: "600",
  fontSize: "large",
  //  textAlign: "right"
}
export const itemdetails: CSSProperties = {
  fontFamily: "Segoe UI, sans-serif",
  fontWeight: "200",
  fontSize: "medium",

}
export const filterContainer: CSSProperties = {
  backgroundColor: "white",
  width: "97%",
  height: "10vh",
  borderBottom: "1px solid rgb(255, 255, 255)",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
  marginBottom: "3vh",
  marginTop: "6vh",
  padding: "2vh",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  minWidth: "64vw"
}

export const frameToGroupButton: CSSProperties = {
  height: "10vh",
  width: "14vw",
  alignItems: "cenetr",
  justifyContent: "space-between",
  backgroundColor: " #f4ece1",
  display: "flex",
  // borderBlock: "2px solid brown",
  paddingLeft: "1vw",
  paddingRight: "1vw",
  borderRadius: "10px",


}
export const btnFound: CSSProperties = {
  color: "rgb(46, 46, 46)",
  border: "none",
  height: "6vh",
  marginTop: "2vh",
  fontFamily: "Segoe UI, sans-serif",
  fontWeight: "200",
  fontSize: "medium",
  backgroundColor: "rgb(237, 237, 237)",
  marginLeft: "1vw"
}
export const btnAll: CSSProperties = {
  color: "rgb(80, 39, 23)",

  height: "6vh",
  marginTop: "2vh",
  fontFamily: "Segoe UI, sans-serif",
  fontWeight: "200",
  fontSize: "medium",
  border: "none",
  backgroundColor: "rgb(237, 237, 237)",
  marginLeft: "1vw"

}
export const btnLost: CSSProperties = {
  color: "rgb(255, 0, 0)",
  height: "6vh",
  marginTop: "2vh",
  fontFamily: "Segoe UI, sans-serif",
  fontWeight: "200",
  fontSize: "medium",
  border: "none",
  backgroundColor: "rgb(237, 237, 237)",

}
export const resetByn: React.CSSProperties = {
  backgroundColor: "#5c4033", // חום כהה
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  padding: "0.6rem 1rem",
  cursor: "pointer",
  transition: "background-color 0.3s ease",
  height: "6vh",
  fontFamily: "Segoe UI, sans-serif",
  fontWeight: "400",
  fontSize: "medium",
  marginRight: "1vw"

};
export const frameToCategoryBtn: CSSProperties = {
  height: "10vh",
  width: "10vw",
  alignItems: "cenetr",
  justifyContent: "space-between",
  backgroundColor: " #f4ece1",
  display: "flex",
  paddingLeft: "2vw",
  paddingRight: "1vw",
  borderRadius: "10px",

}
export const cateforyBtn: React.CSSProperties = {
  backgroundColor: "#5c4033", // חום כהה
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  padding: "0.6rem 1rem",
  cursor: "pointer",
  transition: "background-color 0.3s ease",
  height: "6vh",
  fontFamily: "Segoe UI, sans-serif",
  fontWeight: "400",
  fontSize: "medium",
  marginTop: "2vh",
  width: "auto"
};
export const titleMyFounds: CSSProperties={
  height: "10vh",
  width: "70vw",
  alignItems: "cenetr",
  justifyContent: "space-between",
  backgroundColor: "white",
  display: "flex",
  // borderBlock: "2px solid brown",
  paddingLeft: "1vw",
  paddingRight: "1vw",
  borderRadius: "10px",
  minWidth: "70%"
}
export const wrapperStyle: CSSProperties = {
  display: 'flex',
  overflowX: 'auto',
  whiteSpace: 'nowrap',
  gap: '10px',
  padding: '10px',
  width: "auto",
  marginTop: "4vh"
};

export const itemStyle: CSSProperties = {
  minWidth: '200px',
  height: 'auto', // או ערך מספרי כמו '150px'
  backgroundColor: 'white',
  flexShrink: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '10px', // אם את רוצה מרווח פנימי
};
export const inputStyle: CSSProperties={
  backgroundColor: "white"
}
export const updateButtonStyle: React.CSSProperties = {

   marginInlineStart: 0, // במקום margin-inline-start
  marginInlineEnd: 'auto', // במקום margin-inline-end: auto
  display: 'block',
  backgroundColor: "#fff",
  color: "#d9534f", // אדום בהיר
  border: "1px solid rgb(235, 62, 56)",
  borderRadius: "5px",
  padding: "0.6rem 1rem",
  fontSize: "0.9rem",
  cursor: "pointer",
  transition: "background-color 0.3s ease, color 0.3s ease",


};