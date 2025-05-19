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
    const { data: thisFound } = useGetFoundByIdQuery(id ? id : skipToken)
    const { handleSubmit, register, formState: { errors }, } = useForm({ resolver: zodResolver(AddFoundSchema) });
    const [selectedCategory, setSelectedCategory] = useState<string>("");
    const [, setFound] = useState<Found | null>(null)
    const [UpdateFoundMutation] = useUpdateFoundMutation()
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
    const addFound = async (data: Found | null) => {
        try {
            if (data) {
                const result = await UpdateFoundMutation(data).unwrap();
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

        const isoString = `${data.date}T00:00:00Z`;
        const date = new Date(isoString);

        if (isNaN(date.getTime())) {
            console.error("Invalid date format:", data.date);
            return;
        }
        console.log(thisFound?._id);
        
        const updatedFound: Found = {
            ...data,
            date,
            _id: thisFound?._id!,
            category: Category[
                selectedCategory as keyof typeof Category
            ],
            owner: currentUser as User,
        };

        setFound(updatedFound);
        addFound(updatedFound);
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
    if (!thisFound) {
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
                            defaultValue={thisFound?.name}
                        />
                        {errors.name && <div style={errorCSS}>{errors.name.message}</div>}
                        <TextField
                            id="filled-date"
                            sx={inputStyle}
                            type="date"
                            {...register("date")}
                            style={margin}
                            variant="outlined"
                            defaultValue={formatDate(thisFound?.date)}
                        />
                        {errors.date && <div style={errorCSS}>{errors.date.message}</div>}
                        <FormControl variant="outlined" sx={inputStyle} style={margin} fullWidth>
                            <InputLabel id="city-select-label">עיר</InputLabel>
                            <Select
                                labelId="city-select-label"
                                id="city-select"
                                defaultValue={thisFound?.city}
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
                            defaultValue={thisFound?.street}
                        />
                        {errors.street && <div style={errorCSS}>{errors.street.message}</div>}
                        <FormControl variant="outlined" sx={inputStyle} style={margin} fullWidth>
                            <InputLabel id="category-select-label" style={margin}>
                                קטגוריה
                            </InputLabel>
                            <Select
                                labelId="category-select-label"
                                onChange={handleChangeCategory}
                                defaultValue={thisFound?.category}
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