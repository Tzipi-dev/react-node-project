import { Link, useNavigate, useParams } from 'react-router';
import { useDeleteLostMutation, useGetLostByIdQuery } from '../redux/api/losts/apiLostSlice';
import { Category, Cities, Lost, User } from '../interfaces/models';
import { skipToken } from '@reduxjs/toolkit/query';
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { mainContentStyle } from '../components/CSS-components';
import { loginForm, margin, topbtn } from '../globalStyle';
import { inputStyle } from './CSS-pages';

const DeleteLost = () => {
  const { id } = useParams();
  const { data: thisLost } = useGetLostByIdQuery(id ? id : skipToken);
  const [deleteLost] = useDeleteLostMutation();
  const navigate = useNavigate();
//   const [currentUser, setCurrentUser] = useState<User | null>(null);

//   useEffect(() => {
//     const data = localStorage.getItem("currentUser");
//     if (data) {
//       setCurrentUser(JSON.parse(data));
//     }
//   }, []);

  const confirmAndDelete = async () => {
    if (!thisLost?._id) {
    
      return;
    }

    const confirmed = window.confirm("האם אתה בטוח שברצונך למחוק את האבידה?");
    if (!confirmed) return;

    try {
      await deleteLost({ _id: thisLost._id } as Lost).unwrap();
      navigate('/UserProfile');
    } catch (error) {
      console.error("שגיאה במחיקת האבידה:", error);
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
              value={thisLost?.name || ''}
              slotProps={{ input: { readOnly: true } }}
            />
            <TextField
              type="date"
              variant="outlined"
              style={margin}
              sx={inputStyle}
              value={formatDate(thisLost?.date)}
              slotProps={{ input: { readOnly: true } }}
            />
            <FormControl variant="outlined" sx={inputStyle} style={margin} fullWidth>
              <InputLabel id="city-select-label">עיר</InputLabel>
              <Select
                labelId="city-select-label"
                value={thisLost?.city.trim()  || ''}
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
              value={thisLost?.street || ''}
              InputProps={{ readOnly: true }}
            />
            <FormControl variant="outlined" sx={inputStyle} style={margin} fullWidth>
              <InputLabel id="category-select-label">קטגוריה</InputLabel>
              <Select
                labelId="category-select-label"
                value={thisLost?.category || ''}
                label="קטגוריה"
                readOnly
                disabled
              >
                {Object.values(Category)
                  .filter(val => isNaN(Number(val)))
                  .map(category => (
                    <MenuItem key={category} value={category}>{category.replace(/_/g, " ")}</MenuItem>
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
              מחיקת אבידה
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DeleteLost;
