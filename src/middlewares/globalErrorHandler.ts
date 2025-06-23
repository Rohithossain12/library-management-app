import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";

export const globalErrorHandler = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    const statusCode = err.statusCode || 500;

    if (err instanceof mongoose.Error.ValidationError) {
        res.status(400).json({
            success: false,
            message: "Validation failed",
            error: err,
        });
        return;
    }

    res.status(statusCode).json({
        success: false,
        message: err.message || "Something went wrong",
        error: err,
    });
};
