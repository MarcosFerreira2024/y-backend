import { Request, Response } from "express";
import { errorHandler } from "../helpers/errorHandler";
import LoginUseCase from "../../application/useCases/Authentication/LoginUseCase";
import { container } from "tsyringe";
import { zodSchemaHandler } from "../helpers/schemaHandler";
import { loginSchema } from "../schemas/auth";

class AuthController {
  static async login(req: Request, res: Response) {
    try {
      const { email, password } = zodSchemaHandler(loginSchema, req.body);

      const token = await container
        .resolve(LoginUseCase)
        .execute(email, password);

      res.status(200).json({ token });
      return;
    } catch (error) {
      errorHandler(error, res);
    }
  }
}

export default AuthController;
