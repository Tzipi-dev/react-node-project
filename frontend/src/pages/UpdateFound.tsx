import { Link, useNavigate, useParams } from 'react-router'
import { useGetFoundByIdQuery, useUpdateFoundMutation } from '../redux/api/founds/apiFoundSlice';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import AddFoundSchema from '../schemas/AddFoundSchema';
import { Category, Cities, FieldFillByUser_Found, Found, User } from '../interfaces/models';
import { skipToken } from '@reduxjs/toolkit/query';
import { Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import { mainContentStyle } from '../components/CSS-components';
import { errorCSS, loginForm, margin, topbtn } from '../globalStyle';
import { inputStyle } from './CSS-pages';

const UpdateFound = () => {
   const { id } = useParams()
       const { data: thisLost } = useGetFoundByIdQuery(id ? id : skipToken)
       const { handleSubmit, register, formState: { errors }, } = useForm({ resolver: zodResolver(AddFoundSchema) });
       const [selectedCategory, setSelectedCategory] = useState<string>("");
       const [, setLost] = useState<Found | null>(null)
       const [UpdateLostMutation] = useUpdateFoundMutation()
       const navigate = useNavigate()
       const [currentUser, setCurrentUser] = useState<User>()
       useEffect(() => {
           const data = localStorage.getItem("currentUser");
           if (data) {
               setCurrentUser(JSON.parse(data));
           } else {
               console.log("לא נמצא מידע ב-localStorage");
           }
       }, [])
       const addLost = async (data: Found | null) => {
           try {
               if (data) {
                   const result = await UpdateLostMutation(data).unwrap();
                   console.log(result);
               } else {
                   console.log("אין נתונים. לא מבצעים את הקריאה.");
               }
           }
           catch (error) {
               console.error('Error adding user:', error);
           }
       }
       const onSubmit = (data: FieldFillByUser_Found) => {
           const date = new Date(data.date);
           if (isNaN(date.getTime())) {
               console.error("Invalid date format:", data.date);
               return;
           }
           const updatedLost = {
               name: data.name,
               date: date,
               city: data.city,
               street: data.street,
               category: Category[selectedCategory as keyof typeof Category],
               owner: currentUser as User
           };
           setLost(updatedLost);
           addLost(updatedLost as Found);
           navigate('/');
       }
       const handleChangeCategory = (event: SelectChangeEvent) => {
           setSelectedCategory(event.target.value);
       };
       const formatDate = (date: Date | undefined | string): string => {
           if (!date) {
               return '';
           }
           if (typeof date === 'string') {
               const dateObject = new Date(date);
               if (isNaN(dateObject.getTime())) {
                   return '';
               }
               const year = dateObject.getFullYear();
               const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
               const day = dateObject.getDate().toString().padStart(2, '0');
               return `${year}-${month}-${day}`;
           }
           if (date instanceof Date) {
               const year = date.getFullYear();
               const month = (date.getMonth() + 1).toString().padStart(2, '0');
               const day = date.getDate().toString().padStart(2, '0');
               return `${year}-${month}-${day}`;
           }
           return '';
       };
  return (
      <div>
            <div style={mainContentStyle}>
                <div style={{ justifyContent: "flex-end", width: "60vw" }}>
                    <Link to="/"> ← עמוד הבית </Link>
                    <form style={loginForm} onSubmit={handleSubmit(onSubmit)}>
                        <TextField
                            id="filled-basic"
                            variant="outlined"
                            {...register("name")}
                            style={margin}
                            sx={inputStyle}
                            defaultValue={thisLost?.name}
                        />
                        {errors.name && <div style={errorCSS}>{errors.name.message}</div>}
                        <TextField
                            id="filled-date"
                            sx={inputStyle}
                            type="date"
                            {...register("date")}
                            style={margin}
                            variant="outlined"
                            defaultValue={formatDate(thisLost?.date)}
                        />
                        {errors.date && <div style={errorCSS}>{errors.date.message}</div>}
                        <FormControl variant="outlined" sx={inputStyle} style={margin} fullWidth>
                            <InputLabel id="city-select-label">עיר</InputLabel>
                            <Select
                                labelId="city-select-label"
                                id="city-select"
                                defaultValue={thisLost?.city}
                                {...register("city", { required: "חובה לבחור עיר" })}
                            >
                                <MenuItem value="" disabled>בחר עיר</MenuItem>
                                {Object.values(Cities).map((city) => (
                                    <MenuItem key={city} value={city}>
                                        {city}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        {errors.city && <div style={errorCSS}>{errors.city.message}</div>}
                        <TextField
                            id="filled-street"
                            variant="outlined"
                            type="text"
                            {...register("street")}
                            style={margin}
                            sx={inputStyle}
                            defaultValue={thisLost?.street}
                        />
                        {errors.street && <div style={errorCSS}>{errors.street.message}</div>}
                        <FormControl variant="outlined" sx={inputStyle} style={margin} fullWidth>
                            <InputLabel id="category-select-label" style={margin}>
                                קטגוריה
                            </InputLabel>
                            <Select
                                labelId="category-select-label"
                                onChange={handleChangeCategory}
                                defaultValue={thisLost?.category}
                                label="קטגוריה"
                            >
                                {Object.values(Category)
                                    .filter((val) => isNaN(Number(val)))
                                    .map((category) => (
                                        <MenuItem key={category} value={category}>
                                            {category}
                                        </MenuItem>
                                    ))}
                            </Select>
                        </FormControl>
                      
                        <Button
                            type="submit"
                            fullWidth
                            style={topbtn}
                            size="medium"
                            variant="contained"
                            color="success"
                        >
                           עדכן מציאה
                        </Button>
                    </form>
                </div>
            </div>
        </div>
  )
}

export default UpdateFound