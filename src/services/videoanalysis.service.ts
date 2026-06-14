/**
 * This class is responsible for analysing the video, find the best momemts and extract the highlights. 
 * It will use the OpenAI API to analyse the video and extract the highlights. 
 * It will also use the AppDataSource from src/db/client.ts to save the highlights in the database.
 * 
 * for now, let's fake it
 * We will have a function called analyseVideo that takes the URL and return array of timestamps of the best moments in the video and
 * should update the progress of analysis to the observers using the Observer pattern.
 */

import IVideoAnalysisObserver from "../interface/IVideoAnalysisObserver";
import AnalysisEventsType, { AnalysisEvent } from "../types/analysisevent";
class VideoAnalysisService {
    private delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))
    private observers: IVideoAnalysisObserver[] = [];

    addObserver(observer: IVideoAnalysisObserver): void {
        this.observers.push(observer);
    }

    private async notifyObservers(event: AnalysisEvent): Promise<void> {
        for (const observer of this.observers) {
            await observer.onEvent(event);
        }
    }

    async analyseVideo(streamId: number) {
        this.downloadVideo(streamId);
        //Fake the analysis process and return an array of timestamps of the best moments in the video
        await this.fakeEvents(streamId);
    }

    private async fakeEvents(streamId: number) {
        await this.delay(1000);
        //Fake the events of the analysis process and log them to the console
        console.log("Processing started for video: " + streamId);
        await this.notifyObservers({ type: AnalysisEventsType.PROCESSING_STARTED, streamId });
        await this.delay(2000);
        console.log("Processing in progress for video: " + streamId);
        await this.notifyObservers({ type: AnalysisEventsType.PROCESSING_IN_PROGRESS, streamId });
        await this.delay(3000);
        console.log("Generating highlights for video: " + streamId);
        await this.notifyObservers({ type: AnalysisEventsType.GENERATING_HIGHLIGHTS, streamId });
        await this.delay(4000);
        console.log("Completed analysis for video: " + streamId);
        await this.notifyObservers({ type: AnalysisEventsType.COMPLETED, streamId });
    }

    private async simulateError(streamId: number) {
        await this.delay(1000);
        console.log("Processing started for video: " + streamId);
        await this.notifyObservers({ type: AnalysisEventsType.PROCESSING_STARTED, streamId });
        await this.delay(2000);
        console.log("Processing in progress for video: " + streamId);
        await this.notifyObservers({ type: AnalysisEventsType.PROCESSING_IN_PROGRESS, streamId });
        await this.delay(3000);
        console.log("Error occurred while analysing video: " + streamId);
        await this.notifyObservers({ type: AnalysisEventsType.ERROR, streamId });
    }

    private downloadVideo(streamId: number) {
        //Fake the download process and return true if the URL is valid and false otherwise
        // if (url.startsWith("http")) {
        //     return true;
        // }
        // return false;
    }
}

export default VideoAnalysisService;