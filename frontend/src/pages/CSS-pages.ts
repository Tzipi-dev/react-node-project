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
export const containerOfFound: CSSProperties={
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  gap: '16px', // זה יצור רווח אחיד בין הפריטים (אופקית ואנכית)
  width: '100%',
  

}
export const item: CSSProperties={
  fontFamily: "Segoe UI, sans-serif",
  fontWeight:"600",
  fontSize: "large",
   textAlign: "right"
}
export const itemdetails: CSSProperties={
  fontFamily: "Segoe UI, sans-serif",
  fontWeight:"200",
  fontSize: "medium",
 
}
export const filterContainer: CSSProperties={
  backgroundColor: "white",
  width: "100%",
  height: "10vh",
  borderBottom: "1px solidrgb(255, 255, 255)",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
  marginBottom: "3vh",
  marginTop: "3vh"
}


