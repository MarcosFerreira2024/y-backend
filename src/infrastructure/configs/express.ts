import express, { Express } from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import "reflect-metadata";
import "../../shared/container";

export const configureExpress = (app: Express) => {
  app.use(cors({ origin: "*", credentials: true }));
  app.use(helmet());
  app.set("x-powered-by", false);
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
};
