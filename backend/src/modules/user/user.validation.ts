import { z } from "zod";
import { passwordHashGenerator } from "./user.utils";

const baseSchema = z.object({
  firstName: z.string().min(1).trim(),
  lastName: z.string().min(1).trim(),
  username: z
    .string()
    .min(3)
    .trim()
    .toLowerCase()
    .email("Username must be a valid email"),
  password: z.string().trim().min(6),
});

export const UserSchema = baseSchema.transform(async (data) => {
  const hash = await passwordHashGenerator(data.password);
  console.log(data);
  
  return {
    firstName: data.firstName,
    lastName: data.lastName,
    username: data.username,
    passwordHash: hash,
  };
});