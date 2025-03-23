import { z } from "zod";
const EMAILREGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORDREGEX =/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;
const LogInSchema=z.object({
  email: z.string().regex(EMAILREGEX,{message: "כתובת המייל לא חוקית"}),
  password: z.string().regex(PASSWORDREGEX, {message:" חייב להכיל לפחוות אות גדולה, אות קטנה ומספר"})
})
export default LogInSchema