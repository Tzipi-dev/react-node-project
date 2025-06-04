import { Link, useNavigate, useParams } from 'react-router'
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Category, FieldFillByUser_Lost, Lost, User } from '../interfaces/models';
import { skipToken } from '@reduxjs/toolkit/query';
import {
    Autocomplete, Button, CircularProgress, FormControl,
    InputLabel, MenuItem, Select, SelectChangeEvent, TextField
} from '@mui/material';
import { mainContentStyle } from '../components/CSS-components';
import { errorCSS, loginForm, margin, topbtn } from '../globalStyle';
import { inputStyle } from './CSS-pages';
import { useGetLostByIdQuery, useUpdateLostMutation } from '../redux/api/losts/apiLostSlice';
import AddLostSchema from '../schemas/AddLostSchema';
import { useGetAllCitiesQuery } from '../redux/api/cities/apiCitiesSlice';

const UpdateLost = () => {
    const { id } = useParams();
    const { data: thisLost } = useGetLostByIdQuery(id ? id : skipToken);
    const {
        handleSubmit,
        register,
        formState: { errors },
        control,
        reset
    } = useForm({ resolver: zodResolver(AddLostSchema) });

    const [selectedCategory, setSelectedCategory] = useState<string>("");
    const [, setSelectedCity] = useState<string>("");
    const [, setLost] = useState<Lost | null>(null);
    const [UpdateLostMutation] = useUpdateLostMutation();
    const { data: cities = [], isLoading: isLoadingCities } = useGetAllCitiesQuery();
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState<User>();

    useEffect(() => {
        const data = localStorage.getItem("currentUser");
        if (data) {
            setCurrentUser(JSON.parse(data));
        } else {
           
        }
    }, []);

    useEffect(() => {
        if (thisLost) {
            reset({
                ...thisLost,
                date: formatDate(thisLost.date)
            });
            setSelectedCategory(thisLost.category);
            setSelectedCity(thisLost.city);
        }
    }, [thisLost, reset]);

    const addLost = async (data: Lost | null) => {
        try {
            if (data) {
                const result = await UpdateLostMutation(data).unwrap();
             
            } else {
                
            }
        } catch (error) {
            console.error('Error adding user:', error);
        }
    };

    const onSubmit = (data: FieldFillByUser_Lost) => {
        const isoString = `${data.date}T00:00:00Z`;
        const date = new Date(isoString);
        if (isNaN(date.getTime())) {
            console.error("Invalid date format:", data.date);
            return;
        }

        const updatedLost: Lost = {
            ...data,
            date,
            _id: thisLost?._id!,
            category: Category[selectedCategory as keyof typeof Category],
            owner: currentUser as User,
        };

        setLost(updatedLost);
        addLost(updatedLost);
        navigate('/UserProfile');
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
        return <CircularProgress color="error" />;
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
                        />
                        {errors.name && <div style={errorCSS}>{errors.name.message}</div>}

                        <TextField
                            id="filled-date"
                            sx={inputStyle}
                            type="date"
                            {...register("date")}
                            style={margin}
                            variant="outlined"
                        />
                        {errors.date && <div style={errorCSS}>{errors.date.message}</div>}

                        <Controller
                            name="city"
                            control={control}
                            rules={{ required: "חובה לבחור עיר" }}
                            render={({ field: { onChange, value }, fieldState: { error } }) => (
                                <Autocomplete
                                    options={cities}
                                    value={value || null}
                                    onChange={(event, newValue) => {
                                        onChange(newValue);
                                        setSelectedCity(newValue || "");
                                    }}
                                    getOptionLabel={(option) => option || ""}
                                    loading={isLoadingCities}
                                    noOptionsText="לא נמצאו ערים"
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="עיר"
                                            variant="outlined"
                                            error={!!error}
                                            helperText={error?.message}
                                            sx={inputStyle}
                                            style={margin}
                                        />
                                    )}
                                    fullWidth
                                    disablePortal
                                    freeSolo={false}
                                />
                            )}
                        />
                        {errors.city && <div style={errorCSS}>{errors.city.message}</div>}

                        <TextField
                            id="filled-street"
                            variant="outlined"
                            type="text"
                            {...register("street")}
                            style={margin}
                            sx={inputStyle}
                        />
                        {errors.street && <div style={errorCSS}>{errors.street.message}</div>}

                        <FormControl variant="outlined" sx={inputStyle} style={margin} fullWidth>
                            <InputLabel id="category-select-label" style={margin}>
                                קטגוריה
                            </InputLabel>
                            <Select
                                labelId="category-select-label"
                                onChange={handleChangeCategory}
                                value={selectedCategory}
                                label="קטגוריה"
                            >
                                {Object.values(Category)
                                    .filter((val) => isNaN(Number(val)))
                                    .map((category) => (
                                        <MenuItem key={category} value={category}>
                                            {category.replace(/_/g, " ")}
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
    );
};

export default UpdateLost;
