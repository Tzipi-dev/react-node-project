import { useForm } from "react-hook-form"
import { mainContentStyle } from "../components/CSS-components"
import { Button, TextField } from "@mui/material"
import { zodResolver } from "@hookform/resolvers/zod"
import UserSchema from "../schemas/UserSchema"
import { loginForm, margin, topbtn } from "../globalStyle"
import { inputStyle, textRowStyle } from "./CSS-pages"
import { useEffect, useState } from "react"
import { User } from "../interfaces/models"
import { useUpdateUserMutation } from "../redux/api/users/apiUserSlice"
import { useNavigate } from "react-router"

const UpdateUser = () => {
  const [currentUser, setCurrentUser] = useState<User | null>()
  const { handleSubmit, register, reset } = useForm({
    resolver: zodResolver(UserSchema),
  });
  const [UpdateUserMutation] = useUpdateUserMutation()
  const navigate = useNavigate()
  useEffect(() => {
    const user = localStorage.getItem("currentUser");
    if (user !== null) {
      try {
        const parsedUser: User = JSON.parse(user);
        setCurrentUser(parsedUser);
        reset({
          name: parsedUser.name,
          phone: parsedUser.phone,
          password: parsedUser.password,
          email: parsedUser.email
        });
      } catch (error) {
        setCurrentUser(null);
      }
    } else {
      setCurrentUser(null);
    }
  }, [reset]);


  const onSubmit = async (data: User) => {
    const UpdateUser = {
      name: data.name,
      password: data.password,
      email: data.email,
      phone: data.phone,
      _id: currentUser?._id
    }
    const res = await UpdateUserMutation(UpdateUser)
    if ('data' in res) {
      localStorage.setItem("currentUser", JSON.stringify(res.data));
    } else {
      localStorage.setItem("currentUser", JSON.stringify(res));
    }
    navigate("/")
  }

  return (
    <div>
      <div style={mainContentStyle}>
        <label style={{ fontSize: "large", color: "black" }}>:עדכון פרטי משתמש</label>
        <div style={{ width: "60vw" }}>
          <form onSubmit={handleSubmit(onSubmit)} style={loginForm}>
            <TextField
              id="filled-basic"
              variant="outlined"
              {...register("name")}
              style={margin}
              sx={inputStyle}
              placeholder="שם"

            />
            <TextField
              id="filled-basic"
              variant="outlined"
              type="password"
              {...register("password")}
              style={margin}
              sx={inputStyle}
              placeholder="סיסמה"
            />
            <TextField
              id="filled-basic"
              variant="outlined"
              type="phone"
              {...register("phone")}
              style={margin}
              sx={inputStyle}
              placeholder="טלפון"
            />
            <TextField
              id="filled-basic"
              variant="outlined"
              type="email"
              {...register("email")}
              style={margin}
              sx={inputStyle}
              placeholder="אימייל"
            />
            <Button
              type="submit"
              fullWidth
              style={topbtn}
              size="medium"
              variant="contained"
              color="success"
            >
              עדכן פרטי משתמש</Button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default UpdateUser