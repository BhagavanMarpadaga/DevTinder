import { z} from 'zod'


export const profileUpdateValidationSchema = z.object({
    firstName: z.string().min(4, "First name must be at least 4 characters").max(40, "First name can't exceed 40 characters"),
    lastName: z.string().min(4, "Last name must be at least 4 characters").max(40, "Last name can't exceed 40 characters"),
    age: z.string().optional(), // Age is optional
    gender: z.enum(["Male", "Female", "Other"]).optional(),
    photoUrl: z.string().url("Invalid URL").optional(),
    about: z.string().optional(),
    skills:z.string().array().max(10).optional()
}).strict();

export const signUpValidationSchema = z.object({
    firstName: z.string().min(4, "First name must be at least 4 characters").max(40, "First name can't exceed 40 characters"),
    lastName: z.string().min(4, "Last name must be at least 4 characters").max(40, "Last name can't exceed 40 characters"),
    emaiId: z.string().email("Invalid email format"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .nonempty("Password cannot be empty")
})

export const connectionValidationSchema = z.object({
  fromUserId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId"), // MongoDB ObjectId validation
  toUserId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId"),
  status: z.enum(["ignored", "interested", "accepted", "rejected"]),
})

