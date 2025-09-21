import path from "path";
import * as z from "zod";

export const registerSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }).max(30, { message: "Name must be at most 30 characters." }),
  email: z.email({ message: "Invalid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }).max(20, { message: "Password must be at most 20 characters." }),
  rePassword: z.string().min(6, { message: "Confirm Password must be at least 6 characters." }).max(20, { message: "Confirm Password must be at most 20 characters." }),
  phone: z.string().regex(/^01[0125][0-9]{8}$/, { message: "Invalid Egyptian phone number." }),
}).refine(function(object){
    if(object.password === object.rePassword) {
        {
        return true;
        }
    }
    return false;
}, {
    path: ["rePassword"],
    error: "Passwords do not match",

});


export type RegisterSchemaType = z.infer<typeof registerSchema>;
