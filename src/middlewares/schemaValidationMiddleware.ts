import err from "../errors/index.js";
import { Request, Response, NextFunction } from "express";
import joi from "joi";

export function validateSchema(schema: joi.ObjectSchema<any>) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      const errors: string[] = error.details.map((detail) => detail.message);
      throw err.conflictError(errors);
    }

    next();
  };
}
