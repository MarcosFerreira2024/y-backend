import express, { Express } from "express";
import cors from "cors";
import helmet from "helmet";

export const configureExpress = (app: Express) => {
  app.use(cors({ origin: "*", credentials: true }));
  app.use(helmet());
  app.set("x-powered-by", false);
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
};
