import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { Button, TextField, Typography } from "@mui/material";
import { useResetPasswordMutation } from "../redux/api/users/apiUserSlice";


const ResetPassword = () => {
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!newPassword || !confirmPassword) {
      return setError("נא למלא את כל השדות");
    }

    if (newPassword !== confirmPassword) {
      return setError("הסיסמאות אינן תואמות");
    }

    try {
      const response = await resetPassword({
        token: token || "",
        password: newPassword,
      }).unwrap();

      setMessage("הסיסמה אופסה בהצלחה! מעביר לדף התחברות...");
      setTimeout(() => navigate("/login"), 5173);
    } catch (err: any) {
      console.error("Error resetting password:", err);
      setError(err?.data?.message || "שגיאה באיפוס הסיסמה");
    }
  };

  if (!token) return <Typography>קישור לא חוקי</Typography>;

  return (
    <div style={{ maxWidth: 400, margin: "auto", marginTop: 50 }}>
      <Typography variant="h5" gutterBottom>איפוס סיסמה</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          variant="filled"
          label="סיסמה חדשה"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          variant="filled"
          label="אימות סיסמה"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          margin="normal"
        />
        {error && <div style={{ color: "red" }}>{error}</div>}
        {message && <div style={{ color: "green" }}>{message}</div>}
        <Button type="submit" fullWidth variant="contained" color="primary" disabled={isLoading}>
          {isLoading ? "מעדכן..." : "אפס סיסמה"}
        </Button>
      </form>
    </div>
  );
};

export default ResetPassword;
