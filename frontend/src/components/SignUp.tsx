import { Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import { errorCSS } from "../globalStyle";
import { zodResolver } from "@hookform/resolvers/zod";
import UserSchema from "../schemas/UserSchema";
interface SignUpProps {
    setSignUpModal: (isSignUpOpen: boolean) => void;
}
const SignUp = ({ setSignUpModal }: SignUpProps) => {
    
    const { handleSubmit,register, formState: {errors} } = useForm({resolver: zodResolver(UserSchema)})
    const onSubmit = () => {
        setSignUpModal(false)
    }
    return (
        <div>
            <div onClick={() => { setSignUpModal(false) }}><CancelRoundedIcon /></div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>שם:</div>
                <TextField id="filled-basic" label="שם" variant="filled" {...register("name")}/>
                {errors.name&&<p style={errorCSS}>{errors.name.message}</p>}
                <div>מייל:</div>
                <TextField id="filled-basic" label="מייל" variant="filled" {...register("email")}/>
                {errors.email&&<p style={errorCSS}>{errors.email.message}</p>}
                <div>טלפון:</div>
                <TextField id="filled-basic" label="טלפון" variant="filled" {...register("phone")}/>
                {errors.phone&&<p style={errorCSS}>{errors.phone.message}</p>}
                <div>סיסמה:</div>
                <TextField id="filled-basic" label="סיסמה" variant="filled" type="password" {...register("password")}/>
                {errors.password&&<p style={errorCSS}>{errors.password.message}</p>}
                <div> <Button variant="outlined" type="submit" >sign up</Button></div>
            </form>
        </div>
    )
}

export default SignUp