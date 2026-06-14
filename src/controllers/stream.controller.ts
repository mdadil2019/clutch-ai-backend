/**
 * This file validates, accepts the streaming data from routes/stream.ts and passes it to the service layer to 
 * process the data and store it in the database.
 */

import { Request, Response } from "express";
import StreamsService from "../services/streams.service";
import urlSchema from "../schemas/url.schema";

export const handleIncomingStream = async (request : Request, response : Response) => {
    const {url} = request.query;
    //eg: http://localhost:3000/stream?url=https://www.youtube.com/watch?v=dQw4w9WgXcQ
    const isValidURL = urlSchema.validate({url}).error === undefined;
    if(isValidURL){
        const streamService = new StreamsService();
        const result = await streamService.processStreamData(url as string);
        response.send(result);
    } else {
        response.send("Validate the request and pass it to the service layer.");
    }
}
