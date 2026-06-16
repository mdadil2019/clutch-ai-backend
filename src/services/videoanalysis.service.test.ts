import VideoAnalysisService from "./videoanalysis.service";
import IVideoAnalysisObserver from "../interface/IVideoAnalysisObserver";
import AnalysisEventsType from "../types/analysisevent";
import { describe, jest, test,expect } from "@jest/globals";

describe("VideoAnalysisService", () => {
    test("added observers are notified of events", async () => {
        // Arrange
        const service = new VideoAnalysisService();
        const mockObserver: IVideoAnalysisObserver = {
            onEvent: jest.fn()
        };
        service.addObserver(mockObserver);
        const streamId = 1;

        // Act
        await service.analyseVideo(streamId);

        // Assert
        expect(mockObserver.onEvent).toHaveBeenCalledWith({ type: AnalysisEventsType.PROCESSING_STARTED, streamId });
        expect(mockObserver.onEvent).toHaveBeenCalledWith({ type: AnalysisEventsType.PROCESSING_IN_PROGRESS, streamId });
        expect(mockObserver.onEvent).toHaveBeenCalledWith({ type: AnalysisEventsType.GENERATING_HIGHLIGHTS, streamId });
        expect(mockObserver.onEvent).toHaveBeenCalledWith({ type: AnalysisEventsType.COMPLETED, streamId });
    });
});
