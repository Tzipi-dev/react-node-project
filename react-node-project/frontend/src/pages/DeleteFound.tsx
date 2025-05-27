import { Link, useNavigate, useParams } from 'react-router';
import { useDeleteFoundMutation, useGetFoundByIdQuery } from '../redux/api/founds/apiFoundSlice';
import { useEffect, useState } from 'react';
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { mainContentStyle } from '../components/CSS-components';
import { loginForm, margin, topbtn } from '../globalStyle';
import { inputStyle } from './CSS-pages';
import { Category, Cities, Found, User } from '../interfaces/models';
import { skipToken } from '@reduxjs/toolkit/query';

const DeleteFound = () => {
  const { id } = useParams();
  const { data: thisFound } = useGetFoundByIdQuery(id ? id : skipToken);
  const [DeleteFoundMutation] = useDeleteFoundMutation();
  const navigate = useNavigate();
//   const [currentUser, setCurrentUser] = useState<User | null>(null);

//   useEffect(() => {
//     const data = localStorage.getItem("currentUser");
//     if (data) {
//       setCurrentUser(JSON.parse(data));
//     }
//   }, []);

  const confirmAndDelete = async () => {
    if (!thisFound?._id) {
      console.log("אין פריט למחיקה");
      return;
    }

    const confirmed = window.confirm("האם אתה בטוח שברצונך למחוק את הפריט?");
    if (!confirmed) return;

    try {
      await DeleteFoundMutation({ _id: thisFound._id } as Found).unwrap();
      navigate('/');
    } catch (error) {
      console.error("שגיאה במחיקת הפריט:", error);
    }
  };

  const formatDate = (date: Date | undefined | string): string => {
    if (!date) return '';
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    if (isNaN(dateObj.getTime())) return '';
    const year = dateObj.getFullYear();
    const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
    const day = dateObj.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return (
    <div>
      <div style={mainContentStyle}>
        <div style={{ justifyContent: "flex-end", width: "60vw" }}>
          <Link to="/"> ← עמוד הבית </Link>
          <form style={loginForm} onSubmit={e => { e.preventDefault(); confirmAndDelete(); }}>
            <TextField
              variant="outlined"
              style={margin}
              sx={inputStyle}
              value={thisFound?.name || ''}
              slotProps={{ input: { readOnly: true } }}
            />
            <TextField
              type="date"
              variant="outlined"
              style={margin}
              sx={inputStyle}
              value={formatDate(thisFound?.date)}
              slotProps={{ input: { readOnly: true } }}
            />
            <FormControl variant="outlined" sx={inputStyle} style={margin} fullWidth>
              <InputLabel id="city-select-label">עיר</InputLabel>
              <Select
                labelId="city-select-label"
                value={thisFound?.city || ''}
                label="עיר"
                readOnly
                disabled
              >
                {Object.values(Cities).map(city => (
                  <MenuItem key={city} value={city}>{city}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              variant="outlined"
              type="text"
              style={margin}
              sx={inputStyle}
              value={thisFound?.street || ''}
              InputProps={{ readOnly: true }}
            />
            <FormControl variant="outlined" sx={inputStyle} style={margin} fullWidth>
              <InputLabel id="category-select-label">קטגוריה</InputLabel>
              <Select
                labelId="category-select-label"
                value={thisFound?.category || ''}
                label="קטגוריה"
                readOnly
                disabled
              >
                {Object.values(Category)
                  .filter(val => isNaN(Number(val)))
                  .map(category => (
                    <MenuItem key={category} value={category}>{category}</MenuItem>
                  ))}
              </Select>
            </FormControl>

            <Button
              type="submit"
              fullWidth
              style={topbtn}
              size="medium"
              variant="contained"
              color="error"
            >
              מחיקת מציאה
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DeleteFound;
