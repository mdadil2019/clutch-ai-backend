import {AppDataSource} from "../db/client";
import Stream from "../models/streams";
class StreamRepository {
    async saveStream(url: string): Promise<number | undefined> {
        const savedStream =await AppDataSource.getRepository(Stream).save({streamURL: url });
        return savedStream?.id;
    }
}

export default StreamRepository;