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
import AnalysisEventsType from "../types/analysisevent";
class VideoAnalysisService {
    private delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))
    private observers: IVideoAnalysisObserver[] = [];

    addObserver(observer: IVideoAnalysisObserver): void {
        this.observers.push(observer);
    }

    private notifyObservers(event: AnalysisEventsType): void {
        for (const observer of this.observers) {
            observer.onEvent(event);
        }
    }

    async analyseVideo(url: string) {
        this.downloadVideo(url);
        //Fake the analysis process and return an array of timestamps of the best moments in the video
        await this.fakeEvents(url);
    }

    async fakeEvents(url: string) {
        await this.delay(1000);
        //Fake the events of the analysis process and log them to the console
        console.log("Processing started for video: " + url);
        this.notifyObservers(AnalysisEventsType.PROCESSING_STARTED);
        await this.delay(2000);
        console.log("Processing in progress for video: " + url);
        this.notifyObservers(AnalysisEventsType.PROCESSING_IN_PROGRESS);
        await this.delay(3000);
        console.log("Generating highlights for video: " + url);
        this.notifyObservers(AnalysisEventsType.GENERATING_HIGHLIGHTS);
        await this.delay(4000);
        console.log("Completed analysis for video: " + url);
        this.notifyObservers(AnalysisEventsType.COMPLETED);
    }

    downloadVideo(url: string): boolean {
        //Fake the download process and return true if the URL is valid and false otherwise
        if (url.startsWith("http")) {
            return true;
        }
        return false;
    }
}

export default VideoAnalysisService;