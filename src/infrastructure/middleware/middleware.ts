import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";
import VerifyTokenUseCase from "../../application/useCases/Authentication/VerifyTokenUseCase";
import { errorHandler } from "../../presentation/helpers/errorHandler";

async function middleware(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.headers.authorization) throw new Error("Missing token");

    const token = req.headers.authorization.split(" ")[1];

    await container.resolve(VerifyTokenUseCase).execute(token);

    next();
  } catch (error) {
    errorHandler(error, res);
  }
}

export default middleware;
