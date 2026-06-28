import { Request, Response, NextFunction } from "express";
import { AppError } from "../types/AppError";
import { errorResponse } from "../types/apiResponse";

export function globalErrorHandler(err: Error, req: Request, res: Response, next: NextFunction): void {
    if (err instanceof AppError) {
        res.status(err.statusCode).json(errorResponse(err.message));
    } else {
        res.status(500).json(errorResponse("Internal server error"));
    }
}
