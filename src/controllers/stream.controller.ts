/**
 * This file validates, accepts the streaming data from routes/stream.ts and passes it to the service layer to 
 * process the data and store it in the database.
 */

import { Request, Response } from "express";
import { isValidURL } from "../utils/valildation.utils";
import StreamsService from "../services/streams.service";

export const handleIncomingStream = (request : Request, response : Response) => {
    const {url} = request.query;
    if(isValidURL(url as string)){
        const streamService = new StreamsService();
        const result = streamService.processStreamData({streamURL : url as string} as any);
        response.send(result);
    } else {
        response.send("Validate the request and pass it to the service layer.");
    }
}
