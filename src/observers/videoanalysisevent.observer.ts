import IVideoAnalysisObserver from "../interface/IVideoAnalysisObserver";
import AnalysisEventsType, { AnalysisEvent } from "../types/analysisevent";
import EventRepository from "../repository/event.repository";
/**
 * This class is an implementation of the IVideoAnalysisObserver interface that talks to repository 
 * to store the events of analysis process in the database. 
 */
class VideoAnalysisEventObserver implements IVideoAnalysisObserver {
    private eventRepository = new EventRepository();
    async onEvent(event: AnalysisEvent): Promise<void> {
        console.log("Received event: " + event);
        await this.eventRepository.saveEvent(event);
    }
}

export default VideoAnalysisEventObserver;