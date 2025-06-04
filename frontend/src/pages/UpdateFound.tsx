import { Link, useNavigate, useParams } from 'react-router';
import { useGetFoundByIdQuery, useUpdateFoundMutation } from '../redux/api/founds/apiFoundSlice';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import AddFoundSchema from '../schemas/AddFoundSchema';
import { Category, Cities, FieldFillByUser_Found, Found, User } from '../interfaces/models';
import { skipToken } from '@reduxjs/toolkit/query';
import {
    Autocomplete,
    Button,
    CircularProgress,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField
} from '@mui/material';
import { mainContentStyle } from '../components/CSS-components';
import { errorCSS, loginForm, margin, topbtn } from '../globalStyle';
import { inputStyle } from './CSS-pages';
import { useGetAllCitiesQuery } from '../redux/api/cities/apiCitiesSlice';

const UpdateFound = () => {
    const { id } = useParams();
    const { data: thisFound } = useGetFoundByIdQuery(id ? id : skipToken);
    const {
        handleSubmit,
        register,
        formState: { errors },
        control,
        reset
    } = useForm<FieldFillByUser_Found>({
        resolver: zodResolver(AddFoundSchema),
        defaultValues: {
            name: '',
            street: '',
            city: '',
            date: ''
        }
    });

    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [selectedCity, setSelectedCity] = useState<string>('');
    const [, setFound] = useState<Found | null>(null);
    const [UpdateFoundMutation] = useUpdateFoundMutation();
    const { data: cities = [], isLoading: isLoadingCities } = useGetAllCitiesQuery();
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState<User>();

    useEffect(() => {
        const data = localStorage.getItem('currentUser');
        if (data) {
            setCurrentUser(JSON.parse(data));
        } else {
          
        }
    }, []);

    useEffect(() => {
        if (thisFound) {
            reset({
                name: thisFound.name || '',
                street: thisFound.street || '',
                city: thisFound.city || '',
                date: formatDate(thisFound.date)
            });
            setSelectedCategory(thisFound.category || '');
            setSelectedCity(thisFound.city || '');
        }
    }, [thisFound, reset]);

    const addFound = async (data: Found | null) => {
        try {
            if (data) {
                const result = await UpdateFoundMutation(data).unwrap();
              
            } else {
              
            }
        } catch (error) {
            console.error('Error updating found:', error);
        }
    };

    const onSubmit = (data: FieldFillByUser_Found) => {
        const isoString = `${data.date}T00:00:00Z`;
        const date = new Date(isoString);

        if (isNaN(date.getTime())) {
            console.error('Invalid date format:', data.date);
            return;
        }

        const updatedFound: Found = {
            ...data,
            date,
            _id: thisFound?._id!,
            category: Category[selectedCategory as keyof typeof Category],
            owner: currentUser as User
        };

        setFound(updatedFound);
        addFound(updatedFound);
      navigate('/UserProfile');
    };

    const handleChangeCategory = (event: SelectChangeEvent) => {
        setSelectedCategory(event.target.value);
    };

    const formatDate = (value?: unknown): string => {
        if (!value) return '';
        if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value)) return value;
        const d = new Date(value as string | number | Date);
        if (isNaN(d.getTime())) return '';
        const yyyy = d.getUTCFullYear();
        const mm = String(d.getUTCMonth() + 1).padStart(2, '0');
        const dd = String(d.getUTCDate()).padStart(2, '0');
        return `${yyyy}-${mm}-${dd}`;
    };

    if (!thisFound) {
        return <CircularProgress color="error" />;
    }

    return (
        <div>
            <div style={mainContentStyle}>
                <div style={{ justifyContent: 'flex-end', width: '60vw' }}>
                    <Link to="/"> ← עמוד הבית </Link>
                    <form style={loginForm} onSubmit={handleSubmit(onSubmit)}>
                        <TextField
                            variant="outlined"
                            {...register('name')}
                            style={margin}
                            sx={inputStyle}
                        />
                        {errors.name && <div style={errorCSS}>{errors.name.message}</div>}

                        <TextField
                            sx={inputStyle}
                            type="date"
                            {...register('date')}
                            style={margin}
                            variant="outlined"
                        />
                        {errors.date && <div style={errorCSS}>{errors.date.message}</div>}

                        <Controller
                            name="city"
                            control={control}
                            rules={{ required: 'חובה לבחור עיר' }}
                            render={({ field: { onChange, value }, fieldState: { error } }) => (
                                <Autocomplete
                                    options={cities}
                                    value={value || ''}
                                    onChange={(event, newValue) => {
                                        onChange(newValue || '');
                                        setSelectedCity(newValue || '');
                                    }}
                                    getOptionLabel={(option) => option || ''}
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

                        <TextField
                            variant="outlined"
                            type="text"
                            {...register('street')}
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
                            עדכן מציאה
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateFound;
