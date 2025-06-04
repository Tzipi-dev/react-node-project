import { Button, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import {
  errorCSS,
  loginBox,
  loginForm,
  loginTitle,
  margin,
  topbtn,
} from "../globalStyle";
import { zodResolver } from "@hookform/resolvers/zod";
import UserSchema from "../schemas/UserSchema";
import { useAddUserMutation } from "../redux/api/users/apiUserSlice";
import { User } from "../interfaces/models";
import { useNavigate } from "react-router";
import { loginButtonStyle } from "./CSS-components";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../redux/slice/currentuser";
import zxcvbn from "zxcvbn";
import { useState } from "react";

const SignUp = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ resolver: zodResolver(UserSchema) });

  const [AddUserMutation] = useAddUserMutation();
  const navigate = useNavigate();
  const [, setCookie] = useCookies(["token"]);
  const dispatch = useDispatch();
  const [strength, setStrength] = useState<string>("");

  const onSubmit = async (data: User) => {
    try {
      const result = await AddUserMutation(data).unwrap();
      dispatch(setCurrentUser(result.user));
   
      setCookie("token", result.accessToken, {
        path: "/",
        maxAge: 3600 * 24 * 7,
      });
      localStorage.setItem("currentUser", JSON.stringify(result.user));
      const result2 = zxcvbn(data.password.toString());
      
      navigate("/");
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  const getPasswordStrength = (password: string) => {
    if (password.length < 4) return "weak";
    if (password.length < 8) return "medium";
    return "strong";
  };

  const getColorByStrength = (strength: string) => {
    switch (strength) {
      case "weak":
        return "red";
      case "medium":
        return "orange";
      case "strong":
        return "green";
      default:
        return "gray";
    }
  };

  return (
    <div>
      <div>
        <div style={loginBox}>
          <Typography sx={loginTitle}>SignUp</Typography>
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
              id="filled-basic"
              label="מייל"
              variant="filled"
              {...register("email")}
              style={margin}
            />
            {errors.email && (
              <div style={errorCSS}>{errors.email.message}</div>
            )}

            <TextField
              id="filled-basic"
              label="טלפון"
              variant="filled"
              {...register("phone")}
              style={margin}
            />
            {errors.phone && (
              <div style={errorCSS}>{errors.phone.message}</div>
            )}

            <TextField
              id="filled-basic"
              label="סיסמה"
              variant="filled"
              type="password"
              style={margin}
              {...register("password", {
                onChange: (e) => {
                  const value = e.target.value;
                  const s = getPasswordStrength(value);
                  setStrength(s);
                },
              })}
            />
            <div
              style={{
                height: "5px",
                backgroundColor: getColorByStrength(strength),
                marginTop: "4px",
                borderRadius: "4px",
              }}
            />
            {errors.password && (
              <div style={errorCSS}>{errors.password.message}</div>
            )}

            <div>
              <Button
                variant="contained"
                type="submit"
                fullWidth
                style={topbtn}
              >
                הירשם
              </Button>
              <Button
                variant="outlined"
                style={loginButtonStyle}
                fullWidth
                onClick={() => {
                  navigate("/");
                }}
              >
                ביטול
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
