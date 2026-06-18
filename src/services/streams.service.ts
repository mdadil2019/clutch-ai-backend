//This file is responsible for handling the business logic related to streams. 

import { AppDataSource } from "../db/client";
import Stream from "../models/streams";
import VideoAnalysisEventObserver from "../observers/videoanalysisevent.observer";
import StreamRepository from "../repository/stream.repository";
import VideoAnalysisService from "./videoanalysis.service";

// It will contain functions that interact with the database and perform operations related to streams.
class StreamsService {
    private videoAnalysisEventObserver: VideoAnalysisEventObserver = new VideoAnalysisEventObserver();
    private videoAnalysisService = new VideoAnalysisService();
    initialize() {
        this.videoAnalysisService.addObserver(this.videoAnalysisEventObserver);
    }

    async processStream(url: string): Promise<number> {
        const streamRepository = new StreamRepository();
        let streamId: number | undefined;
        try {
            streamId = await streamRepository.saveStream(url);
        } catch (error) {
            // Handle error while saving stream
            throw new Error(`Failed to save stream: ${error}`);
        }
        this.initiateVideoAnalysis(streamId as number);
        return streamId as number;
    }

    private async initiateVideoAnalysis(streamId: number): Promise<void> {
        try {
            await this.videoAnalysisService.analyseVideo(streamId as number);
        } catch (error) {
            // Handle error while initiating video analysis
            throw new Error(`Failed to initiate video analysis: ${error}`);
        }
    }
}
export default StreamsService;