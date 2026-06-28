/**
 * Test scenarios for StreamsService.
 * 1. Should store the stream data in database.
 * 2. Should handle error while storing the stream database and return appropriate error message.
 * 3. Should call the video analysis service to analyse the video.
 * 4. Should handle error while analysing the video and return appropriate error message.
 * 
 * Note: We will mock the database and video analysis service to test the StreamsService in isolation.
 */
import { beforeEach, describe, expect, jest, test, afterEach } from "@jest/globals";
import StreamsService from "./streams.service";
import VideoAnalysisService from "./videoanalysis.service";
const mockSaveStream = jest.fn();
jest.mock("../repository/stream.repository", () => {
    return jest.fn().mockImplementation(() => {
        return { saveStream: mockSaveStream };
    });
});

describe("StreamsService", () => {
    beforeEach(() => {
        jest.useFakeTimers();
        mockSaveStream.mockReset();
        jest.clearAllMocks();
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    test("should store the stream data in database", async () => {
        // Arrange
        const streamService = new StreamsService();

        // Act
        const promise = streamService.processStream("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
        jest.runAllTimers();
        await promise;

        // Assert
        expect(mockSaveStream).toHaveBeenCalledWith("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
        expect(mockSaveStream).toHaveBeenCalledTimes(1);
    }),

        test("should handle error while storing the stream database and return appropriate error message", async () => {
            // Arrange
            const streamService = new StreamsService();
            const mockError = new Error("Failed to save stream");
            mockSaveStream.mockImplementation(() => Promise.reject(mockError));

            //Act & Assert
            await expect(
                streamService.processStream("https://www.youtube.com/watch?v=dQw4w9WgXcQ")
            ).rejects.toThrow("Failed to save stream: Error: Failed to save stream");
        }),

        test("should call the analyseVideo method of video analysis service to analyse the video", async () => {
            // Arrange
            const streamService = new StreamsService();
            const mockAnalyseVideo = jest.fn<() => Promise<void>>().mockResolvedValue(undefined);
            (streamService as any).videoAnalysisService.analyseVideo = mockAnalyseVideo;

            // Act
            const promise = streamService.processStream("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
            jest.runAllTimers();
            await promise;

            // Assert
            expect(mockAnalyseVideo).toHaveBeenCalledTimes(1);
        });

});
