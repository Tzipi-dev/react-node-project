import { CSSProperties } from "react";


export const sidebarStyle: React.CSSProperties = {
  position: "fixed",
  top: "60px", // מתחיל 60px מלמעלה - גובה הניווט העליון המשוער
  left: 0,
  width: "15%",
  height: "calc(100vh - 60px)", // הגובה מתאים את עצמו לגובה המסך פחות גובה הניווט העליון
  backgroundColor: "#f9f5f1",
  padding: "1rem",
  boxShadow: "2px 0 5px rgba(0, 0, 0, 0.1)",
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  fontFamily: "Segoe UI, sans-serif",
  zIndex: 999, // מוודא שהוא מתחת לניווט העליון (zIndex גבוה יותר)
  paddingTop: "6vh"
};

export const menuItemStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "0.5rem", // מרווח בין האייקון והטקסט - אפשר להשאיר ב-rem או להשתמש באחוזים קטנים
  fontSize: "1vw", // גודל הפונט יהיה יחסי לרוחב המסך
  color: "#3e3e3e",
  textDecoration: "none",
  cursor: "pointer",
};

export const lostIconStyle: React.CSSProperties = {
  color: "darkred",
  fontSize: "1.2vw", // גודל האייקון יכול להיות מעט גדול יותר מהטקסט
};

export const foundIconStyle: React.CSSProperties = {
  color: "darkolivegreen",
  fontSize: "1.2vw",
};
export const navContainerStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between", // מפזר את האלמנטים באופן שווה
  padding: "1rem 2rem", // ריווח פנימי מלמעלה/למטה ומהצדדים
  backgroundColor: "#f8f8f8", // צבע רקע בהיר
  borderBottom: "1px solid #eee", // קו תחתון דק
};

export const navStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "1rem 2rem",
  backgroundColor: "#f8f5f1",
  borderBottom: "1px solidrgb(255, 255, 255)",
  position: "fixed", // הופך את הניווט לקבוע בראש העמוד
  top: 0, // ממקם אותו בחלק העליון
  left: 0, // ממקם אותו בצד שמאל (לרוחב מלא)
  right: 0, // מרחיב אותו עד לצד ימין (לרוחב מלא)
  zIndex: 1000,
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)"
};

export const logoStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  fontSize: "1.2rem",
  fontWeight: "bold",
  color: "#5c4033", // חום כהה ללוגו
  textDecoration: "none",
};

export const logoIconStyle: React.CSSProperties = {
  marginRight: "0.5rem",
  fontSize: "1.5rem",
  color: "#5c4033",
};

export const loggingStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "1rem",
};

export const linkStyle: React.CSSProperties = {
  textDecoration: "none",
};

export const loginButtonStyle: React.CSSProperties = {


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

export const loginButtonStyleHover: React.CSSProperties = {
  backgroundColor: "#4a3227",
};

export const signupButtonStyle: React.CSSProperties = {
  backgroundColor: "#5c4033", // חום כהה
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  padding: "0.6rem 1rem",
  fontSize: "0.9rem",
  cursor: "pointer",
  transition: "background-color 0.3s ease",
  marginLeft: "1vw",
  fontFamily: "Segoe UI, sans-serif",
  fontWeight: "100"
};

export const signupButtonStyleHover: React.CSSProperties = {
  backgroundColor: "#d9534f",
  color: "#fff",
};
export const mainContentStyle: React.CSSProperties = {
  marginTop: "8vh", // מונע גלישה מתחת לניווט העליון
  marginLeft: "14vw", // מונע גלישה מתחת לניווט הצדדי (אם הוא בצד שמאל)
  padding: "1rem", // ריווח פנימי לתוכן
  minHeight: "50vh",
  // minWidth: "100vw"
};
export const cardsContainerStyle: CSSProperties = {
  display: 'flex',
  justifyContent: 'space-around',
  width: '100%',
  padding: '0.5rem',
  gap: '1rem',
  marginTop: '5vh', // הוספתי את המרווח העליון לכאן
};
export const cardStyle: CSSProperties = {
  backgroundColor: '#f8f8f8',
  borderRadius: '0.25rem',
  padding: '0.5rem',
  flexBasis: '30%',
  width: "20vw",
  height: "20vh",
  // maxWidth: '200px',
  // minWidth: '120px', /* הגדלנו את הרוחב המינימלי */
  textAlign: 'right',
  boxShadow: '0.05rem 0.1rem 0.2rem rgba(0, 0, 0, 0.1)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  fontSize: 'large'
};

export const iconContainerBaseStyle: CSSProperties = {
  width: '2rem',
  height: '2rem',
  borderRadius: '50%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: '0.25rem',
  fontSize: '1rem',
};

export const redIconStyle: CSSProperties = {
  ...iconContainerBaseStyle,
  backgroundColor: '#ffebee',
  color: '#f44336',
};

export const grayIconStyle: CSSProperties = {
  ...iconContainerBaseStyle,
  backgroundColor: '#eeeeee',
  color: '#757575',
};

export const greenIconStyle: CSSProperties = {
  ...iconContainerBaseStyle,
  backgroundColor: '#e8f5e9',
  color: '#4caf50',
};

export const titleStyle: CSSProperties = {
  fontSize: "large",
  marginBottom: '0.1rem',
};

export const countStyle: CSSProperties = {
  fontWeight: 'bold',
  fontSize: "large"
};


export const ContainerInfo: CSSProperties = {
  width: "73vw",
  display: "flex",
  //  left: '80%', 
  color: "black",
  marginTop: "15vh",
  alignItems: "center",
  // textAlign: "center",
  marginLeft: "15.2vw",
  justifyContent: "space-around",
  textAlign: 'right'
}
export const recentItemsContainer: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
  gap: '16px',
  width: '70vw',
  marginLeft: "8vw",
  marginTop:"5vh"
}
export const items: CSSProperties = {
  backgroundColor: 'background.paper',
  borderRadius: 1,
  padding: 2, 
  width: "13vw", 
  height: "20vh",
  color:"#795548",
  fontFamily: "Segoe UI, sans-serif",
  fontWeight:"300",
 textAlign: "right",
  // alignItems: "start",
  justifyContent: "flex-start"
}
export const foundTitle: CSSProperties={
     backgroundColor: " #f0f0f0",
     color: "#333",
     boxShadow: " 1px 1px 5px rgb(80, 39, 23)",
     
}
export const lostTitle: CSSProperties={
  backgroundColor: " #f0f0f0",
     color: "#333",
     boxShadow: "1px 1px 5px rgb(255, 0, 0)"
}
export const showItemsDiv: CSSProperties={
  display: "flex",
  color: "rgb(61, 29, 17)",
  fontFamily: "Segoe UI, sans-serif",
  fontWeight:"500",
  // width: "100vw",
  justifyContent: "space-between",
  fontSize: "large",
  marginBottom: "1vh"
}
export const btnAllItems:CSSProperties={
  backgroundColor: 'transparent',
  color: 'red',
  border: '1px solid red',
  borderRadius: '5px',
  padding: '0.7rem 1.5rem',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
}
export const iconStyle: React.CSSProperties = {
      width: '1.7vw', 
    height: '1.7vw',
    borderRadius: '50%',
    backgroundColor: 'rgb(111, 110, 110)',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1vw', 
    fontWeight: "100",
    marginLeft: '-0.2vw' 
  };

