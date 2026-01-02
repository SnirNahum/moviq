import { Router } from "express";
import { loginBodySchema, registerBodySchema } from "./auth.schemas";
import { validate } from "../../core/validata";

export const authRouter = Router();

const ROUTES = {
  register: "/register",
  login: "/login",
} as const;

authRouter.post(
  ROUTES.register,
  validate({ body: registerBodySchema }),
  async (req, res) => {
    const body = req.body as { email: string; password: string };

    res.status(201).json({
      user: { user: { email: body.email, name: body.password } },
    });
  }
);

authRouter.post(
  ROUTES.login,
  validate({ body: loginBodySchema }),
  async (req, res) => {
    const body = req.body as { email: string };
    res.status(200).json({
      accessToken: "",
      user: { email: body.email, name: "User" },
    });
  }
);
