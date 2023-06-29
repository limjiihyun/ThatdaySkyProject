import { NextFunction, Request, Response } from "express";

export interface Controller {
  [key: string]: Control;
}

export type Control = (
  req: Request,
  res: Response,
  next?: NextFunction
) => void;
