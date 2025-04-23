import { z } from "zod";
const AddFoundSchema=z.object({
     name: z.string().min(2),
     date: z.date(),
     
})
export default AddFoundSchema

// export interface Found{
//     categiry:Categiry,
//     name: String,
//     city: String,
//     street: String,
//     owner: User,
//     date: Date,
//     identifying: Array<String>,
//     _id?: string 
// }