/**
 * This file validates, accepts the streaming data from routes/stream.ts and passes it to the service layer to 
 * process the data and store it in the database.
 */

import { Request, Response, NextFunction } from "express";
import StreamsService from "../services/streams.service";
import urlSchema from "../schemas/url.schema";
import { successResponse } from "../types/apiResponse";
import { AppError } from "../types/AppError";

export const handleIncomingStream = async (request: Request, response: Response, next: NextFunction) => {
    const { url } = request.query;
    //eg: http://localhost:3000/stream?url=https://www.youtube.com/watch?v=dQw4w9WgXcQ
    const isValidURL = urlSchema.validate({ url }).error === undefined;
    if (!isValidURL) {
        return next(new AppError("Invalid URL", 400));
    }

    const streamService = new StreamsService();
    try {
        const result = await streamService.processStream(url as string);
        response.json(successResponse(result));
    } catch (error) {
        next(error);
    }
}
