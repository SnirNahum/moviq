import { z } from "zod";

export const registerBodySchema = z.object({
  email: z.email(),
  password: z.string().min(8).max(72),
});
export const loginBodySchema = z.object({
  email: z.email(),
  password: z.string().min(8).max(72),
});

export type RegisterBody = z.infer<typeof registerBodySchema>;
export type LoginBody = z.infer<typeof loginBodySchema>;
