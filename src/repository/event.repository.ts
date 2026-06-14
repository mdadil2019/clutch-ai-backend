import { AnalysisEvent }from "../types/analysisevent";
import {AppDataSource} from "../db/client"
import Event from "../models/events";
class EventRepository{
    async saveEvent(event: AnalysisEvent): Promise<void> {
        const eventRepo = AppDataSource.getRepository(Event)
        const newEvent = new Event();
        newEvent.status = event.type;
        newEvent.streamId = event.streamId; 
        await eventRepo.save(newEvent);
    }
}

export default EventRepository;