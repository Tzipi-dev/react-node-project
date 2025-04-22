import { Button, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import LogInSchema from "../schemas/LogInSchema";
import { errorCSS, loginBox, loginForm, loginTitle, margin, topbtn } from "../globalStyle";
import { LogInUser, User } from "../interfaces/models";
import { useAddLoginMutation } from "../redux/api/loging/apiLoginSlice";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
const LogIn = () => {
  const [loggedInUserId, setLoggedInUserId] = useState<string | undefined>(undefined);
  const [currentUser, setCurrentUser] = useState<User>()
  const [addLogin] = useAddLoginMutation();
  const { handleSubmit, register, formState: { errors } } = useForm({ resolver: zodResolver(LogInSchema) })
  const navigate = useNavigate()
  const onSubmit = async (data: LogInUser) => {
    try {
      const result = await addLogin(data).unwrap();
      setLoggedInUserId(result.user._id.toString());
      setCurrentUser({ _id: result.user._id, name: result.user.name, email: result.user.email, phone: result.user.phone, password: result.user.password })
      navigate('/')
    } catch (err) {
      console.log(err);
    }
    finally{

    }
  }
  // useEffect(() => {
  //   if (currentUser) {
  //     console.log("פרטי משתמש (מ-useGetUserByIdQuery):", currentUser);
  //   }
  // }, [currentUser]);
  return (
    <div>
      <div >
        <div style={loginBox}>
          <Typography sx={loginTitle}>Log In</Typography>
          <form style={loginForm} onSubmit={handleSubmit(onSubmit)} >
            <TextField id="filled-basic" label="מייל" variant="filled"  {...register("email",)} style={margin} />
            {errors.email && <div style={errorCSS}>{errors.email.message}</div>}
            <TextField id="filled-basic" label="סיסמה" variant="filled" {...register("password",)} style={margin} />
            {errors.password && <div style={errorCSS}>{errors.password.message}</div>}
            <div style={topbtn}>
            <Button type="submit" fullWidth style={topbtn} size="medium" variant="contained" color="success">log in</Button>
            <Button variant="outlined" color="success" fullWidth onClick={() => { navigate('/') }}>ביטול</Button>
          </div>
          </form>
         
        </div>
      </div>
    </div>
  )
}

export default LogIn