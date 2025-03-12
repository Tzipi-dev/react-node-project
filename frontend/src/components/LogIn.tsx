import { Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import { zodResolver } from "@hookform/resolvers/zod"
import LogInSchema from "../schemas/LogInSchema";

import { errorCSS } from "../globalStyle";
interface LogInProps {
  setOpenModal: (isOpenModal: boolean) => void;
}

const LogIn = ({ setOpenModal }: LogInProps) => {
 
  const { handleSubmit, register, formState: { errors } } = useForm({ resolver: zodResolver(LogInSchema) })
  const onSubmit = () => {
    setOpenModal(false)
  }

  return (
    <div>
      <div onClick={() => { setOpenModal(false) }}><CancelRoundedIcon /></div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <TextField id="filled-basic" label="מייל" variant="filled" {...register("email",)} />
          {errors.email && <p style={errorCSS}>{errors.email.message}</p>}
        </div>
        <div>
          <TextField id="filled-basic" label="סיסמה" variant="filled" />
        </div>
        <Button variant="outlined" type="submit">log in</Button>
      </form>
    </div>
  )
}

export default LogIn