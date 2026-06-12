//This file is responsible for handling the business logic related to streams. 

import { AppDataSource } from "../db/client";
import Stream from "../models/streams";

// It will contain functions that interact with the database and perform operations related to streams.
class StreamsService {
     processStreamData(url : string){
        //Inject the stream info and event into the database using the AppDataSource from src/db/client.ts
        const stream = new Stream();
        stream.streamURL = url;
        const streamRepo = AppDataSource.getRepository(Stream);
        streamRepo.save(stream);
    }

}

export default StreamsService;