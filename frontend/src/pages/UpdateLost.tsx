import { Link, useNavigate, useParams } from 'react-router'
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Category, Cities, FieldFillByUser_Lost, Lost, User } from '../interfaces/models';
import { skipToken } from '@reduxjs/toolkit/query';
import { Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import { mainContentStyle } from '../components/CSS-components';
import { errorCSS, loginForm, margin, topbtn } from '../globalStyle';
import { inputStyle } from './CSS-pages';
import { useGetLostByIdQuery, useUpdateLostMutation } from '../redux/api/losts/apiLostSlice';
import AddLostSchema from '../schemas/AddLostSchema';
const UpdateLost = () => {
    const { id } = useParams()
    const { data: thisLost } = useGetLostByIdQuery(id ? id : skipToken)
    const { handleSubmit, register, formState: { errors }, } = useForm({ resolver: zodResolver(AddLostSchema) });
    const [selectedCategory, setSelectedCategory] = useState<string>("");
    const [, setLost] = useState<Lost | null>(null)
    const [UpdateLostMutation] = useUpdateLostMutation()
    
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
    const addLost = async (data: Lost | null) => {
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

    const onSubmit = (data: FieldFillByUser_Lost) => {

        const isoString = `${data.date}T00:00:00Z`;
        const date = new Date(isoString);
        if (isNaN(date.getTime())) {
            console.error("Invalid date format:", data.date);
            return;
        }
        console.log(thisLost?._id);
        const updatedLost: Lost = {
            ...data,
            date,
            _id: thisLost?._id!,
            category: Category[
                selectedCategory as keyof typeof Category
            ],
            owner: currentUser as User,
        };

        setLost(updatedLost);
        addLost(updatedLost);
        navigate('/');
    };
    const handleChangeCategory = (event: SelectChangeEvent) => {
        setSelectedCategory(event.target.value);
    };
    const formatDate = (value?: unknown): string => {
        if (!value) return '';
        if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value))
            return value;
        const d = new Date(value as string | number | Date);
        if (isNaN(d.getTime())) return '';
        const yyyy = d.getUTCFullYear();
        const mm = String(d.getUTCMonth() + 1).padStart(2, '0');
        const dd = String(d.getUTCDate()).padStart(2, '0');
        return `${yyyy}-${mm}-${dd}`;
    };
    if (!thisLost) {
        return <div>טוען…</div>;   // אל תציג את הטופס לפני שיש נתונים
    }
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
                            עדכן אבידה
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default UpdateLost