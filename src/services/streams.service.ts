//This file is responsible for handling the business logic related to streams. 

import { AppDataSource } from "../db/client";
import Stream from "../models/streams";
import VideoAnalysisEventObserver from "../observers/videoanalysisevent.observer";
import StreamRepository from "../repository/stream.repository";
import VideoAnalysisService from "./videoanalysis.service";

// It will contain functions that interact with the database and perform operations related to streams.
class StreamsService {
    private videoAnalysisEventObserver = new VideoAnalysisEventObserver();
    async processStreamData(url: string) {
        const streamRepository = new StreamRepository();
        const streamId = await streamRepository.saveStream(url);
        const videoAnalysisService = new VideoAnalysisService();

        //Adding the observer to the video analysis service so that it can notify the 
        // observer about the progress of the analysis.
        videoAnalysisService.addObserver(this.videoAnalysisEventObserver);
        //TODO: try catch to handle error while video analysis
        videoAnalysisService.analyseVideo(streamId as number);
    }

}

export default StreamsService;