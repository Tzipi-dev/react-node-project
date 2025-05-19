import { z } from "zod";
const AddFoundSchema=z.object({
     name: z.string().min(2),
     date: z.string(),
     city:z.string(),
     street: z.string(),
    
     
})
export default AddFoundSchema



