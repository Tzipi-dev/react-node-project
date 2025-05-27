import { z } from "zod";
const AddLostSchema=z.object({
     name: z.string().min(2),
     date: z.string(),
     city:z.string(),
     street: z.string(),
    
})
export default AddLostSchema



