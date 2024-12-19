import {Request, Response, NextFunction} from "express";
import {ObjectSchema} from "joi";

export const validateRequest =
    (schema: ObjectSchema) => (req: Request, res: Response, next: NextFunction): void => {
        const {error} = schema.validate(req.body, {abortEarly: false});
        if (error) {
            res.status(400).json({
                error: "Validation failed",
                details: error.details.map((detail) => detail.message),
            });
        } else {
            next();
        }
    };

export const validateQueryParams =
    (schema: ObjectSchema) => (req: Request, res: Response, next: NextFunction): void => {
        const {error, value} = schema.validate(req.query, {abortEarly: false});
        if (error) {
            res.status(400).json({
                error: "Validation failed",
                details: error.details.map((detail) => detail.message),
            });
        } else {
            req.query = value;
            next();
        }
    };
