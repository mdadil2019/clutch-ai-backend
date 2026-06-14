import {AppDataSource} from "../db/client";
class StreamRepository {
    async saveStream(url: string): Promise<number | undefined> {
        const savedStream =await AppDataSource.getRepository("streams").save({streamURL: url });
        return savedStream?.id;
    }
}

export default StreamRepository;