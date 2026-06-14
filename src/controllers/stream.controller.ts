/**
 * This file validates, accepts the streaming data from routes/stream.ts and passes it to the service layer to 
 * process the data and store it in the database.
 */

import { Request, Response } from "express";
import StreamsService from "../services/streams.service";
import urlSchema from "../schemas/url.schema";

export const handleIncomingStream = (request : Request, response : Response) => {
    const {url} = request.query;
    const isValidURL = urlSchema.validate({url}).error === undefined;
    if(isValidURL){
        const streamService = new StreamsService();
        const result = streamService.processStreamData({streamURL : url as string} as any);
        response.send(result);
    } else {
        response.send("Validate the request and pass it to the service layer.");
    }
}
