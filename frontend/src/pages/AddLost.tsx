import {
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Autocomplete
} from "@mui/material";
import { errorCSS, loginForm, margin, topbtn } from "../globalStyle";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { SelectChangeEvent } from "@mui/material/Select";
import { Category, FieldFillByUser_Lost, Lost, User } from "../interfaces/models";
import { useGetAllCitiesQuery } from "../redux/api/cities/apiCitiesSlice";
import { Link, useNavigate } from "react-router";
import AddLostSchema from "../schemas/AddLostSchema";
import { useAddLostMutation } from "../redux/api/losts/apiLostSlice";
import { mainContentStyle } from "../components/CSS-components";
import { inputStyle } from "./CSS-pages";

const AddLost = () => {
  const { data: cities = [], isLoading: isLoadingCities } = useGetAllCitiesQuery();
  const { handleSubmit, register, control, formState: { errors } } = useForm({
    resolver: zodResolver(AddLostSchema)
  });

  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [, setLost] = useState<Lost | null>(null);
  const [AddLostMutation] = useAddLostMutation();
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<User>();
  const [, setSelectedCity] = useState<string>("");

  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  const maxDate = `${year}-${month}-${day}`;

  useEffect(() => {
    const data = localStorage.getItem("currentUser");
    if (data) {
      setCurrentUser(JSON.parse(data));
    } else {
      
    }
  }, []);

  const onSubmit = (data: FieldFillByUser_Lost) => {
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
    addLost(updatedLost as Lost);
    navigate('/');
  };

  const addLost = async (data: Lost | null) => {
    try {
      if (data) {
        const result = await AddLostMutation(data).unwrap();
      
      } else {
       
      }
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  const handleChangeCategory = (event: SelectChangeEvent) => {
    setSelectedCategory(event.target.value);
  };

  return (
    <div style={mainContentStyle}>
      <div style={{ justifyContent: "flex-end", width: "60vw" }}>
        <Link to="/"> ← עמוד הבית </Link>
        <form style={loginForm} onSubmit={handleSubmit(onSubmit)}>
          <TextField
            id="filled-basic"
            label="שם"
            variant="outlined"
            {...register("name")}
            style={margin}
            sx={inputStyle}
          />
          {errors.name && <div style={errorCSS}>{errors.name.message}</div>}

          <TextField
            id="filled-date"
            label="תאריך אבידה"
            sx={inputStyle}
            type="date"
            {...register("date")}
            style={margin}
            variant="outlined"
            slotProps={{
              input: {
                inputProps: {
                  max: maxDate,
                },
              },
            }}
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
            label="רחוב"
            variant="outlined"
            type="text"
            {...register("street")}
            style={margin}
            sx={inputStyle}
          />
          {errors.street && <div style={errorCSS}>{errors.street.message}</div>}

          <FormControl variant="outlined" sx={inputStyle} style={margin} fullWidth>
            <InputLabel id="category-select-label" style={margin}>קטגוריה</InputLabel>
            <Select
              labelId="category-select-label"
              onChange={handleChangeCategory}
              value={selectedCategory}
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
            הוסף אבידה
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AddLost;
