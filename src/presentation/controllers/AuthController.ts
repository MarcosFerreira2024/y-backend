import { Request, Response } from "express";
import { errorHandler } from "../helpers/errorHandler";
import LoginUseCase from "../../application/useCases/Authentication/LoginUseCase";
import { container } from "tsyringe";
import { zodSchemaHandler } from "../helpers/schemaHandler";
import { loginSchema, tokenSchema } from "../schemas/auth";
import VerifyTokenUseCase from "../../application/useCases/Authentication/VerifyTokenUseCase";

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

  static async verifyToken(req: Request, res: Response) {
    try {
      if (!req.headers.authorization) throw new Error("Missing token");
      const data = zodSchemaHandler(
        tokenSchema,
        req.headers.authorization.split(" ")[1]
      );

      const token = await container.resolve(VerifyTokenUseCase).execute(data);

      res.status(200).json({ message: "Valid token", token });
      return;
    } catch (error) {
      errorHandler(error, res);
    }
  }
}

export default AuthController;
