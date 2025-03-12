import { z } from "zod";
const EMAILREGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORDREGEX =/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;

const UserSchema=z.object({
email: z.string().regex(EMAILREGEX,{message: "כתובת המייל לא חוקית"}),
name: z.string().min(2, {message: 'שם חייב להכיל לפחות 2 אותיות'}),
phone: z.string().min(9,{message: 'טלפון צריך להכיל לפחות 9 ספרות'}).max(10, {message: 'טלפון צריך להכיל עד 10 ספרות'}),
password: z.string().regex(PASSWORDREGEX, {message:" חייב להכיל לפחוות אות גדולה, אות קטנה ומספר"})
})
export default UserSchema