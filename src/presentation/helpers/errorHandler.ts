import { Request, Response } from "express";

export function errorHandler(error: any, res: Response) {
  if (error instanceof Error)
    return res.status(400).json({ error: error.message });
  res.status(500).json({ error: "Internal server error" });
}
