import { Button, TextField, Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import { errorCSS, loginBox, loginForm, margin, topbtn } from "../globalStyle";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import AddFoundSchema from "../schemas/AddFoundSchema";
import { useState } from "react";
import { SelectChangeEvent } from "@mui/material/Select";
import { Category, Cities, FieldFillByUser_Found, Found } from "../interfaces/models";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../redux/slice/currentuser";
import { useAddFoundMutation } from "../redux/api/founds/apiFoundSlice";
import { Link, useNavigate } from "react-router";
import { mainContentStyle } from "../components/CSS-components";
import { inputStyle } from "./CSS-pages";
const AddFound = () => {
  const { handleSubmit, register, formState: { errors } } = useForm({ resolver: zodResolver(AddFoundSchema) });
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [, setFound] = useState<Found | null>(null)
  const currentUser = useSelector(selectCurrentUser)
  const [AddFoundMutation] = useAddFoundMutation()
  const navigate = useNavigate()
  const onSubmit = (data: FieldFillByUser_Found) => {
    const date = new Date(data.date);
    if (isNaN(date.getTime())) {
      console.error("Invalid date format:", data.date);
      return;
    }
    const updatedFound = {
      name: data.name,
      date: date,
      city: data.city,
      street: data.street,
      identifying: [data.firstIdentity, data.secondIdentity, data.thirdIdentity],
      category: Category[selectedCategory as keyof typeof Category],
      owner: currentUser,
    };
    addFound(updatedFound);
    setFound(updatedFound);
    navigate('/')
  }
  const addFound = async (data: Found | null) => {
    try {
      if (data) {
        const result = await AddFoundMutation(data).unwrap();
        console.log(result);
      } else {
        console.log("אין נתונים. לא מבצעים את הקריאה.");
      }
    }
    catch (error) {
      console.error('Error adding user:', error);
    }
  }
  const handleChangeCategory = (event: SelectChangeEvent) => {
    setSelectedCategory(event.target.value);
  };
  return (
    <div style={mainContentStyle}>
      <div style={{ justifyContent: "flex-end" }}>
        <Link to="/"> ← עמוד הבית </Link>
        <form style={loginForm} onSubmit={handleSubmit(onSubmit)}>

          <TextField
            id="filled-basic"
            label="שם"
            variant="outlined"
            {...register("name")}
            style={margin}
            fullWidth
            margin="normal"
            sx={inputStyle}
          />
          {errors.name && <div style={errorCSS}>{errors.name.message}</div>}
          <TextField
            id="filled-date"
            label="תאריך מציאה"
           variant="outlined"
            type="date"
            {...register("date")}
            style={margin}
            sx={inputStyle}
          />
          {errors.date && <div style={errorCSS}>{errors.date.message}</div>}
          <FormControl variant="outlined" style={margin} sx={inputStyle} fullWidth>
            <InputLabel id="city-select-label" >עיר</InputLabel>
            <Select
              labelId="city-select-label"
              id="city-select"
              defaultValue=""

              {...register("city", { required: "חובה לבחור עיר" })}
            >
              <MenuItem value="" disabled>בחר עיר</MenuItem>
              {Object.values(Cities).map((city) => (
                <MenuItem key={city} value={city}>
                  {city}
                </MenuItem>
              ))}
            </Select>
            {errors.city && (
              <div style={{ color: "red", fontSize: "0.8rem" }}>
                {errors.city.message}
              </div>
            )}
          </FormControl>
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
          <FormControl variant="outlined" style={margin} sx={inputStyle} fullWidth>
            <InputLabel id="category-select-label" style={margin} >קטגוריה</InputLabel>
            <Select
              labelId="category-select-label"
              onChange={handleChangeCategory}
              value={selectedCategory}
            >
              {Object.values(Category).map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <div style={{ display: "flex", gap: "2%" }}>
            <TextField
              id="filled-identity-1"
              label="מזהה 1"
            variant="outlined"
              type="text"
              {...register("firstIdentity")}
              style={margin}
              sx={inputStyle}
            />
            {errors.firstIdentity && <div style={errorCSS}>{errors.firstIdentity.message}</div>}

            <TextField
              id="filled-identity-2"
              label="מזהה 2"
              variant="outlined"
              type="text"
              {...register("secondIdentity")}
              style={margin}
              sx={inputStyle}
            />
            {errors.secondIdentity && <div style={errorCSS}>{errors.secondIdentity.message}</div>}
            <TextField
              id="filled-identity-3"
              label="מזהה 3"
              variant="outlined"
              type="text"
              {...register("thirdIdentity")}
              style={margin}
              sx={inputStyle}
            />
            {errors.thirdIdentity && <div style={errorCSS}>{errors.thirdIdentity.message}</div>}
          </div>
          <Button
            type="submit"
            fullWidth
            style={topbtn}
            size="medium"
            variant="contained"
            color="success"
          >
            הוסף מציאה
          </Button>
        </form>
      </div>
    </div>
  );
};
export default AddFound;
