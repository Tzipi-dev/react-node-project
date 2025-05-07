import { Button, TextField, Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import { errorCSS, loginBox, loginForm, margin, topbtn } from "../globalStyle";
import {  useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { SelectChangeEvent } from "@mui/material/Select";
import { Category, Cities, FieldFillByUser_Lost, Lost } from "../interfaces/models";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../redux/slice/currentuser";
import { useNavigate } from "react-router";
import AddLostSchema from "../schemas/AddLostSchema";
import { useAddLostMutation } from "../redux/api/losts/apiLostSlice";
import { mainContentStyle } from "../components/CSS-components";
const AddLost = () => {
  const { handleSubmit, register, formState: { errors } } = useForm({ resolver: zodResolver(AddLostSchema) });
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [, setLost] = useState<Lost | null>(null)
  const currentUser = useSelector(selectCurrentUser)
  const [AddLostMutation] = useAddLostMutation()
  const navigate = useNavigate()
  const onSubmit = (data: FieldFillByUser_Lost) => {
    const date = new Date(data.date);
    if (isNaN(date.getTime())) {
      console.error("Invalid date format:", data.date);
      return;
    }
    if (currentUser?._id) {
      const updatedLost = {
        name: data.name,
        date: date,
        city: data.city,
        street: data.street,
        identifying: [data.firstIdentity, data.secondIdentity, data.thirdIdentity],
        category: Category[selectedCategory as keyof typeof Category],
        owner: currentUser._id,
      };
      addLost(updatedLost as Lost);
      setLost(updatedLost);
      navigate('/');
    } else {
      console.error("currentUser is undefined or missing _id, cannot submit lost item.");
    }
  }
  const addLost = async (data: Lost | null) => {
    try {
      if (data) {
        const result = await AddLostMutation(data).unwrap();
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
      <div style={loginBox}>
        <form style={loginForm} onSubmit={handleSubmit(onSubmit)}>
          <TextField
            id="filled-basic"
            label="שם"
            variant="filled"
            {...register("name")}
            style={margin}
          />
          {errors.name && <div style={errorCSS}>{errors.name.message}</div>}
          <TextField
            id="filled-date"
            label="תאריך אבידה"
            variant="filled"
            type="date"
            {...register("date")}
            style={margin}
          />
          {errors.date && <div style={errorCSS}>{errors.date.message}</div>}
          <FormControl variant="filled" style={margin} fullWidth>
            <InputLabel id="city-select-label">עיר</InputLabel>
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
            variant="filled"
            type="text"
            {...register("street")}
            style={margin}
          />
          {errors.street && <div style={errorCSS}>{errors.street.message}</div>}
          <FormControl variant="filled" style={margin} fullWidth>
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
                    {category}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          <div style={{ display: "flex", gap: "2%" }}>
            <TextField
              id="filled-identity-1"
              label="מזהה 1"
              variant="filled"
              type="text"
              {...register("firstIdentity")}
              style={margin}
            />
            {errors.firstIdentity && <div style={errorCSS}>{errors.firstIdentity.message}</div>}

            <TextField
              id="filled-identity-2"
              label="מזהה 2"
              variant="filled"
              type="text"
              {...register("secondIdentity")}
              style={margin}
            />
            {errors.secondIdentity && <div style={errorCSS}>{errors.secondIdentity.message}</div>}
            <TextField
              id="filled-identity-3"
              label="מזהה 3"
              variant="filled"
              type="text"
              {...register("thirdIdentity")}
              style={margin}
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
            הוסף אבידה
          </Button>
        </form>
      </div>
    </div>
  );
}

export default AddLost