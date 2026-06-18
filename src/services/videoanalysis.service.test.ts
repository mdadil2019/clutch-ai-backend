import VideoAnalysisService from "./videoanalysis.service";
import IVideoAnalysisObserver from "../interface/IVideoAnalysisObserver";
import AnalysisEventsType from "../types/analysisevent";
import { beforeEach, afterEach, describe, jest, test, expect } from "@jest/globals";

/**
 * Test suite for VideoAnalysisService.
 * 1. Should be able to add observers to the VideoAnalysisService.
 * 2. Should notify all observers of the events in the correct order.
 * 3. Should notify observers of errors in the analysis process.
 * 4. Should analyse video and generate events in the correct order.
 * 5. Should handle errors in the analysis process gracefully.
 * 
 */

describe("VideoAnalysisService", () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    test("should be able to add observers to the VideoAnalysisService", () => {
        // Arrange
        const service = new VideoAnalysisService();
        const mockObserver: IVideoAnalysisObserver = {
            onEvent: jest.fn<() => Promise<void>>()
        }

        // Act
        service.addObserver(mockObserver);

        // Assert
        expect((service as any).observers).toContain(mockObserver);
    }),

        test("should notify all observers of the events in the correct order", async () => {
            // Arrange
            const service = new VideoAnalysisService();
            const mockObserver1: IVideoAnalysisObserver = {
                onEvent: jest.fn<() => Promise<void>>()
            };
            const mockObserver2: IVideoAnalysisObserver = {
                onEvent: jest.fn<() => Promise<void>>()
            };
            service.addObserver(mockObserver1);
            service.addObserver(mockObserver2);
            const streamId = 1;

            // Act — start the promise, then advance all fake timers to skip delays
            const promise = service.analyseVideo(streamId);
            await jest.runAllTimersAsync();
            await promise;

            // Assert
            expect(mockObserver1.onEvent).toHaveBeenCalledWith({ type: AnalysisEventsType.PROCESSING_STARTED, streamId });
            expect(mockObserver1.onEvent).toHaveBeenCalledWith({ type: AnalysisEventsType.PROCESSING_IN_PROGRESS, streamId });
            expect(mockObserver1.onEvent).toHaveBeenCalledWith({ type: AnalysisEventsType.GENERATING_HIGHLIGHTS, streamId });
            expect(mockObserver1.onEvent).toHaveBeenCalledWith({ type: AnalysisEventsType.COMPLETED, streamId });

            expect(mockObserver2.onEvent).toHaveBeenCalledWith({ type: AnalysisEventsType.PROCESSING_STARTED, streamId });
            expect(mockObserver2.onEvent).toHaveBeenCalledWith({ type: AnalysisEventsType.PROCESSING_IN_PROGRESS, streamId });
            expect(mockObserver2.onEvent).toHaveBeenCalledWith({ type: AnalysisEventsType.GENERATING_HIGHLIGHTS, streamId });
            expect(mockObserver2.onEvent).toHaveBeenCalledWith({ type: AnalysisEventsType.COMPLETED, streamId });
        }),
        test("should notify observers of errors in the analysis process", async () => {
            // Arrange
            const service = new VideoAnalysisService();
            const mockObserver: IVideoAnalysisObserver = {
                onEvent: jest.fn<() => Promise<void>>()
            };
            service.addObserver(mockObserver);
            const streamId = 1;

            //mock fakeEvents to throw an error
            (service as any).fakeEvents = jest.fn().mockImplementation(() => {
                throw new Error("Fake error");
            });
            service.analyseVideo(streamId);

            // Assert
            expect(mockObserver.onEvent).toHaveBeenCalledWith({ type: AnalysisEventsType.ERROR, streamId });
        }),
        test("should analyse video and generate events in the correct order", async () => {
            // Arrange
            const service = new VideoAnalysisService();
            const mockObserver: IVideoAnalysisObserver = {
                onEvent: jest.fn<() => Promise<void>>()
            };
            service.addObserver(mockObserver);
            const streamId = 1;

            // Act — start the promise, then advance all fake timers to skip delays
            const promise = service.analyseVideo(streamId);
            await jest.runAllTimersAsync();
            await promise;

            // Assert
            expect(mockObserver.onEvent).toHaveBeenCalledWith({ type: AnalysisEventsType.PROCESSING_STARTED, streamId });
            expect(mockObserver.onEvent).toHaveBeenCalledWith({ type: AnalysisEventsType.PROCESSING_IN_PROGRESS, streamId });
            expect(mockObserver.onEvent).toHaveBeenCalledWith({ type: AnalysisEventsType.GENERATING_HIGHLIGHTS, streamId });
            expect(mockObserver.onEvent).toHaveBeenCalledWith({ type: AnalysisEventsType.COMPLETED, streamId });
        });
});

