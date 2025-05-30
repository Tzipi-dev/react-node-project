import {
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl
} from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { SelectChangeEvent } from "@mui/material/Select";
import { Link, useNavigate } from "react-router";

import AddFoundSchema from "../schemas/AddFoundSchema";
import {
  errorCSS,
  loginForm,
  margin,
  topbtn
} from "../globalStyle";
import {
  Category,
  Cities,
  FieldFillByUser_Found,
  Found,
  User
} from "../interfaces/models";
import { useAddFoundMutation } from "../redux/api/founds/apiFoundSlice";
import { mainContentStyle } from "../components/CSS-components";
import { inputStyle } from "./CSS-pages";

const AddFound = () => {
  const { handleSubmit, register, formState: { errors } } = useForm({
    resolver: zodResolver(AddFoundSchema)
  });

  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [AddFoundMutation] = useAddFoundMutation();
  const [currentUser, setCurrentUser] = useState<User>();
  const [, setFound] = useState<Found | null>(null);
  const navigate = useNavigate();

  const today = new Date();
  const maxDate = today.toISOString().split("T")[0]; // YYYY-MM-DD

  useEffect(() => {
    const data = localStorage.getItem("currentUser");
    if (data) {
      setCurrentUser(JSON.parse(data));
    } else {
      console.warn("לא נמצא מידע ב-localStorage");
    }
  }, []);

  const handleChangeCategory = (event: SelectChangeEvent) => {
    setSelectedCategory(event.target.value);
  };

  const addFound = async (data: Found | null) => {
    if (!data) return console.warn("אין נתונים. לא מבצעים את הקריאה.");
    try {
      const result = await AddFoundMutation(data).unwrap();
      console.log(result);
    } catch (error) {
      console.error("Invalid date format:", error);
    }
  };

  const onSubmit = (data: FieldFillByUser_Found) => {
    const date = new Date(data.date);
    if (isNaN(date.getTime())) {
      console.error("תאריך לא תקין:", data.date);
      return;
    }

    const updatedFound: Found = {
      name: data.name,
      date,
      city: data.city,
      street: data.street,
      category: Category[selectedCategory as keyof typeof Category],
      owner: currentUser as User
    };

    addFound(updatedFound);
    setFound(updatedFound);
    navigate("/");
  };

  return (
    <div style={mainContentStyle}>
      <div style={{ justifyContent: "flex-end", width: "60vw" }}>
        <Link to="/">← עמוד הבית</Link>
        <form style={loginForm} onSubmit={handleSubmit(onSubmit)}>

          <TextField
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
            label="תאריך מציאה"
            variant="outlined"
            type="date"
            {...register("date")}
            style={margin}
            sx={inputStyle}
            slotProps={{
              input: {
                inputProps: {
                  max: maxDate,
                },
              },
            }} />
          {errors.date && <div style={errorCSS}>{errors.date.message}</div>}

          <FormControl variant="outlined" style={margin} sx={inputStyle} fullWidth>
            <InputLabel id="city-select-label">עיר</InputLabel>
            <Select
              labelId="city-select-label"
              defaultValue=""
              {...register("city", { required: "חובה לבחור עיר" })}
            >
              <MenuItem value="" disabled>בחר עיר</MenuItem>
              {Object.values(Cities).map((city) => (
                <MenuItem key={city} value={city}>{city}</MenuItem>
              ))}
            </Select>
          </FormControl>
          {errors.city && <div style={errorCSS}>{errors.city.message}</div>}

          <TextField
            label="רחוב"
            variant="outlined"
            type="text"
            {...register("street")}
            style={margin}
            sx={inputStyle}
          />
          {errors.street && <div style={errorCSS}>{errors.street.message}</div>}

          <FormControl variant="outlined" style={margin} sx={inputStyle} fullWidth>
            <InputLabel id="category-select-label">קטגוריה</InputLabel>
            <Select
              labelId="category-select-label"
              value={selectedCategory}
              onChange={handleChangeCategory}
            >
              {Object.values(Category).map((category) => (
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
