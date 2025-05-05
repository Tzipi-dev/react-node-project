import { Button , TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import LogInSchema from "../schemas/LogInSchema";
import { errorCSS, loginBox, loginForm, loginTitle, margin, topbtn } from "../globalStyle";
import { LogInUser, User } from "../interfaces/models";
import { useAddLoginMutation } from "../redux/api/loging/apiLoginSlice";
import { useNavigate } from "react-router";
import {  useState } from "react";
import { useDispatch } from "react-redux";
import { setCurrentUser as setReduxUser } from "../redux/slice/currentuser";
import {useCookies} from "react-cookie"
import { loginButtonStyle } from "./CSS-components";
const LogIn = () => {
  const [loggedInUserId, setLoggedInUserId] = useState<string | undefined>(undefined);
  const [currentUser, setCurrentUser] = useState<User>()
  const [addLogin] = useAddLoginMutation();
  const { handleSubmit, register, formState: { errors } } = useForm({ resolver: zodResolver(LogInSchema) })
  const navigate = useNavigate()
  const [loginError, setloginError] = useState<string>("")
  const [isError, setIsError] = useState<boolean>(false)
  const dispatch=useDispatch()
  const [cookies, setCookie] = useCookies(['token']);
  const onSubmit = async (data: LogInUser) => {
    try {
      const result = await addLogin(data).unwrap();
      setLoggedInUserId(result.user._id.toString());
      setCurrentUser({ _id: result.user._id, name: result.user.name, email: result.user.email, phone: result.user.phone, password: result.user.password })
      setCookie('token', result.accessToken, { path: '/', maxAge: 3600 * 24 * 7 }); 
      dispatch(setReduxUser(currentUser))
      navigate('/')
    } catch (err) {
      console.log(err);
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
          </form>
        </div>
      </div>
    </div>
  )
}

export default LogIn