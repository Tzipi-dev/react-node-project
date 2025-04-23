import { Button, Select, TextField, Typography, selectClasses, InputLabel, MenuItem, FormControl } from "@mui/material";
import { errorCSS, loginBox, loginForm, loginTitle, margin, topbtn } from "../globalStyle";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import AddFoundSchema from "../schemas/AddFoundSchema"; 
import { useEffect, useState } from "react";
import { useGetAllCitiesQuery } from "../redux/api/cities/apiCitiesSlice";
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import CircularProgress from '@mui/material/CircularProgress';
const AddFound = () => {
  const { handleSubmit, register, formState: { errors } } = useForm({resolver: zodResolver(AddFoundSchema),});
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  const { data: cities, isLoading } = useGetAllCitiesQuery();
  useEffect(() => {
  }, [cities]);
  const onSubmit = () => {
  };
  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <div>
      <div style={loginBox}>
        <Typography sx={loginTitle}>:הוסף מציאה</Typography>
        <form style={loginForm} onSubmit={handleSubmit(onSubmit)}>
          <TextField id="filled-basic"  label="שם" variant="filled"{...register("name")}style={margin}/>
          {errors.name && <div style={errorCSS}>{errors.name.message}</div>}
          <TextField id="filled-basic" label="תאריך מציאה" variant="filled" type="date"  {...register("date")}style={margin} />
          
          {errors.date && <div style={errorCSS}>{errors.date.message}</div>}
          <Button type="submit" fullWidth style={topbtn} size="medium" variant="contained" color="success">
            הוסף
          </Button>
        </form>
      
        
      </div>
    </div>
  );
}



export default AddFound;