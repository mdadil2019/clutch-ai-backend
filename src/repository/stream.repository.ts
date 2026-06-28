import {AppDataSource} from "../db/client";
import Stream from "../models/streams";
class StreamRepository {
    async saveStream(url: string): Promise<Stream | undefined> {
        const savedStream =await AppDataSource.getRepository(Stream).save({streamURL: url });
        return savedStream;
    }
}

export default StreamRepository;