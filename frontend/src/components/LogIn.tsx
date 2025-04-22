import { Button, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
// import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import { zodResolver } from "@hookform/resolvers/zod"
import LogInSchema from "../schemas/LogInSchema";
import { errorCSS, loginBox, loginContainer, loginForm, loginTitle } from "../globalStyle";
import { LogInUser, User } from "../interfaces/models";
import { useAddLoginMutation } from "../redux/api/loging/apiLoginSlice";
import { Link, useNavigate } from "react-router";
import { useEffect, useState } from "react";

// import { getCookie } from "../utils/cookieUtils";
const LogIn = () => {
  const [loggedInUserId, setLoggedInUserId] = useState<string | undefined>(undefined);
  const [currentUser, setCurrentUser] = useState<User>()
  // const [AddLoginMutation] = useAddLoginMutation()
  const [addLogin] = useAddLoginMutation();
  const { handleSubmit, register, formState: { errors } } = useForm({ resolver: zodResolver(LogInSchema) })
  console.log(loginBox);
  

  const navigate = useNavigate()
  const onSubmit = async (data: LogInUser) => {
    try {
      const result = await addLogin(data).unwrap();
      console.log("שם המשתמש:", result.user.name);
      console.log("מספר טלפון:", result.user.phone);
      console.log("accessToken", result.accessToken);
      setLoggedInUserId(result.user._id.toString());
      // document.cookie = `token=${result.accessToken}; path=/; secure; HttpOnly; SameSite=Strict`;
      console.log(loggedInUserId);
      // console.log("Token:", getCookie('token'));
      setCurrentUser({ _id: result.user._id, name: result.user.name, email: result.user.email, phone: result.user.phone, password: result.user.password })
      console.log(result);
      navigate('/')
    } catch (err) {

    }
    finally {

    }
  }
  useEffect(() => {
    if (currentUser) {
      console.log("פרטי משתמש (מ-useGetUserByIdQuery):", currentUser);
    }
  }, [currentUser]);
  return (
    <div>
      <div style={loginContainer}>
        <div style={loginBox}>
          <Typography sx={loginTitle}>LogIn</Typography>
          {/* <div onClick={}><CancelRoundedIcon /></div> */}
          <form style={loginForm} onSubmit={handleSubmit(onSubmit)}>

            <div>
              <TextField id="filled-basic" label="מייל" variant="filled" {...register("email",)} />
              {errors.email && <p style={errorCSS}>{errors.email.message}</p>}
            </div>
            <div>
              <TextField id="filled-basic" label="סיסמה" variant="filled" {...register("password",)} />
              {errors.password && <p style={errorCSS}>{errors.password.message}</p>}
            </div>
            <Button variant="outlined" type="submit">log in</Button>
          </form>
          <Button variant="outlined">
            <Link to="/">ביטול</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default LogIn