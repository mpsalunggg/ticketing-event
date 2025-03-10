import { z } from "zod";

export const AuthValidationSchema = z.object({
   email: z.string().nonempty({
      message: "Email cannot be empty.",
   }),
   password: z.string().nonempty({
      message: "Password cannot be empty.",
   }),
});

export type AuthValidationType = z.infer<typeof AuthValidationSchema>;
