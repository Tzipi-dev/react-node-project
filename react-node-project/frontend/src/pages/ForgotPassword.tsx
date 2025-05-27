import { useState } from "react";
import { Button, TextField, Typography } from "@mui/material";
import { useForgotPasswordMutation } from "../redux/api/users/apiUserSlice";
import { detailTitle, loginBox, topbtn } from "../globalStyle";
import { lostTitle } from "../components/CSS-components";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");


  const [forgotPassword, { isLoading, error: apiError, data }] = useForgotPasswordMutation(); 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await forgotPassword(email).unwrap(); 
      setSent(true); 
    } catch (err: any) {
      setError(err.message || "שגיאה בשליחת הבקשה"); 
    }
  };

  return (
    <div style={loginBox}>
      <Typography variant="h5" gutterBottom sx={detailTitle}>שחזור סיסמה</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          variant="filled"
          label="הכנס כתובת מייל"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          margin="normal"
        />
        {error && <div style={{ color: "red" }}>{error}</div>} 
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          disabled={sent || isLoading} 
          style={topbtn}
        >
          {isLoading ? 'שולח...' : 'שלח קישור לאיפוס'}
        </Button>
      </form>
      {sent && <Typography color="success.main">הקישור נשלח למייל שלך</Typography>} 
      {apiError && <div style={{ color: "red" }}>{ " ERROR "}</div>}
    </div>
  );
};

export default ForgotPassword;
