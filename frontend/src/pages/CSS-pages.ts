import { CSSProperties } from 'react';

export const brownContainerStyle: CSSProperties = {
    backgroundColor: '#795548', /* גוון חום כמו בתמונה */
  color: '#fff', /* צבע טקסט לבן */
  padding: '1rem', /* ריווח פנימי קטן יותר */
  borderRadius: '0.5vw', /* פינות מעוגלות */
  position: 'fixed', /* נשאר קבוע בחלק העליון */
  top: '13vh', /* ממקם אותו בחלק העליון */
  left: '60%', /* ממקם אותו במרכז אופקית */
  transform: 'translateX(-50%)', /* מרכז אותו בדיוק אופקית */
  zIndex: 1000, /* מבטיח שהוא יהיה מעל תוכן אחר */
//   display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem', /* מרווח קטן יותר בין השורות */
  alignItems: 'right', /* יישור הטקסט והכפתורים למרכז */
  textAlign: 'right', /* יישור טקסט במרכז */
  width: '75%', /* רוחב הבאנר */
  maxWidth: '70vw', /* רוחב מקסימלי */
  marginTop: '1rem',
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

