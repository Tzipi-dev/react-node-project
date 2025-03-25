import { Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import { zodResolver } from "@hookform/resolvers/zod"
import LogInSchema from "../schemas/LogInSchema";

import { errorCSS } from "../globalStyle";

import { LogInUser } from "../interfaces/models";
import { useAddLoginMutation } from "../redux/api/loging/apiLoginSlice";
import { useDispatch } from "react-redux";

interface LogInProps {
  setOpenModal?: (isOpenModal: boolean) => void;
}

const LogIn = ({ setOpenModal }: LogInProps) => {
  //const dispatch=useDispatch()
 const [ AddLoginMutation]=useAddLoginMutation()
  const { handleSubmit, register, formState: { errors } } = useForm({ resolver: zodResolver(LogInSchema) })
  const onSubmit = async(data: LogInUser) => {
    
       try {
        const result = await AddLoginMutation(data).unwrap()
        //localStorage.setItem('token', result);
       
    } catch (err) {
        
    }
    finally{
      if (setOpenModal)
        {
         setOpenModal(false)
        } 
    }
  }

  return (
    <div>
      <div onClick={() => {if (setOpenModal) setOpenModal(false) }}><CancelRoundedIcon /></div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <TextField id="filled-basic" label="מייל" variant="filled" {...register("email",)} />
          {errors.email && <p style={errorCSS}>{errors.email.message}</p>}
        </div>
        <div>
          <TextField id="filled-basic" label="סיסמה" variant="filled" {...register("password",)}/>
          {errors.password && <p style={errorCSS}>{errors.password.message}</p>}
        </div>
        <Button variant="outlined" type="submit">log in</Button>
      </form>
    </div>
  )
}

export default LogIn