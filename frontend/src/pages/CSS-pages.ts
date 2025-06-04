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
  gap: '16px', 
  width: '100%',
  minHeight: "500px",
 

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
  minWidth: "68vw"
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
export const updateButtonStyle: CSSProperties = {

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
 fontFamily: "Segoe UI, sans-serif",
  fontWeight: "100"

};

 
export const containerStyle: React.CSSProperties = {
  width: '40vw',
  // margin: '80px auto',
  background: 'linear-gradient(to bottom right, #fefefe, #f7f7f7)',
  padding: '40px',
  borderRadius: '24px',
  boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
  fontFamily: '"Varela Round", sans-serif',
  direction: 'rtl',
  color: '#222',
  marginTop: "3vh"
};

export const sectionTitle: React.CSSProperties = {
  fontSize: '26px',
  fontWeight: 700,
  marginBottom: '20px',
  color: '#3f3f3f',
  borderBottom: '2px solid #ddd',
  paddingBottom: '6px',
};

export const detailRow: React.CSSProperties = {
  fontSize: '18px',
  padding: '6px 0',
  borderBottom: '1px solid #eee',
  display: 'flex',
  justifyContent: 'space-between',
};

export const labelStyle: React.CSSProperties = {
  fontWeight: 600,
  color: '#555',
};

export const valueStyle: React.CSSProperties = {
  color: '#333',
};
export const cardStyle: React.CSSProperties = {
  backgroundColor: "#fff",
  borderRadius: "20px",
  padding: "32px",
  boxShadow: "0 4px 18px rgba(0, 0, 0, 0.1)",
  width: "11vw",
  margin: "auto",
  direction: "rtl",
  fontFamily: "Varela Round, sans-serif",
  display: "flex",
  flexDirection: "column",
  gap: "16px",
  
};
export const badgeStyle: React.CSSProperties = {
  alignSelf: "flex-start",
  backgroundColor: "#f9f9f9",
  padding: "4px 12px",
  borderRadius: "20px",
  color: "#5e4035",
  boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
  fontSize: "14px",
};

export const textRowStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
  color: "#5a5a5a",
  fontSize: "16px",
};

export const iconStyle: React.CSSProperties = {
  fontSize: "18px",
  color: "#5e4035",
};

export const titleStyle: React.CSSProperties = {
  fontWeight: 600,
  fontSize: "18px",
  color: "#5e4035",
  marginBottom: "-8px",
};
export const darkBrownCircleStyle: React.CSSProperties = {
  width: "80px",
  height: "80px",
  borderRadius: "50%",
  backgroundColor: "#4E342E", // חום כהה
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: "white", // צבע טקסט (אם תוסיפי טקסט פנימי)
  fontWeight: "200",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)", // צל לעיצוב יפה
  marginLeft: "68vw",
  fontSize:"xx-large",
  cursor: "pointer",
  marginTop:"-10vh"
};
