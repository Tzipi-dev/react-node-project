
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import LogInSchema from "../schemas/LogInSchema";
import { errorCSS, loginBox, loginForm, loginTitle, margin, topbtn } from "../globalStyle";
import { LogInUser } from "../interfaces/models";
import { useAddLoginMutation } from "../redux/api/loging/apiLoginSlice";
import { NavLink, useNavigate } from "react-router";
import {  useState } from "react";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../redux/slice/currentuser";
import {useCookies} from "react-cookie"
import { loginButtonStyle } from "./CSS-components";
import { Button, TextField, Typography } from "@mui/material";
const LogIn = () => {
  const [addLogin] = useAddLoginMutation();
  const { handleSubmit, register, formState: { errors } } = useForm({ resolver: zodResolver(LogInSchema) })
  const navigate = useNavigate()
  const [loginError, setloginError] = useState<string>("")
  const [isError, setIsError] = useState<boolean>(false)
  const dispatch=useDispatch()
  const [, setCookie] = useCookies(['token']);
  const onSubmit = async (data: LogInUser) => {
    try {
      const result = await addLogin(data).unwrap();
      dispatch(setCurrentUser(result.user))
      setCookie('token', result.accessToken, { path: '/', maxAge: 60 * 60 * 24 * 365 * 20 }); 
      localStorage.setItem("currentUser", JSON.stringify(result.user));
      navigate('/')
    } catch (err) {
     
      setloginError("המשתמש אינו קיים או שאחד מהנתונים שגוי")
      setIsError(true)
    }
  }
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
            {isError && <div style={errorCSS}>{loginError}</div>}
            <div >
              <Button type="submit" fullWidth style={topbtn} size="medium" variant="contained" color="success">log in</Button>
              <Button variant="outlined" style={loginButtonStyle} fullWidth onClick={() => { navigate('/') }}>ביטול</Button>
            </div>
            <NavLink to="/forgot-password"  style={{ textTransform: 'none', marginTop: '10px' ,color:"black"}}>שכחתי סיסמה</NavLink>
          </form>
        </div>
      </div>
    </div>
  )
}

export default LogIn