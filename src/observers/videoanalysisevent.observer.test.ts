import { beforeEach, describe, expect, jest, test } from "@jest/globals";
import AnalysisEventsType, { AnalysisEvent } from "../types/analysisevent";
import VideoAnalysisEventObserver from "./videoanalysisevent.observer";

// jest.mock must be at the top level — Jest hoists it before any imports run
const mockSaveEvent = jest.fn();
jest.mock("../repository/event.repository", () => {
    return jest.fn().mockImplementation(() => {
        return { saveEvent: mockSaveEvent };
    });
});

describe("VideoAnalysisEventObserver", () => {
    beforeEach(() => {
        mockSaveEvent.mockClear();
    });

    test("should save event to the database when notified", async () => {
        // Arrange
        const observer = new VideoAnalysisEventObserver();
        const mockEvent: AnalysisEvent = { type: AnalysisEventsType.PROCESSING_STARTED, streamId: 1 };

        // Act
        await observer.onEvent(mockEvent);

        // Assert
        expect(mockSaveEvent).toHaveBeenCalledWith(mockEvent);
        expect(mockSaveEvent).toHaveBeenCalledTimes(1);
    });

    test("should handle error when saving event fails", async () => {
        // Arrange
        const observer = new VideoAnalysisEventObserver();
        const mockEvent: AnalysisEvent = { type: AnalysisEventsType.PROCESSING_STARTED, streamId: 1 };
        const mockError = new Error("Failed to save event");
        mockSaveEvent.mockImplementation(() => Promise.reject(mockError));

        // Act & Assert
        await expect(observer.onEvent(mockEvent)).rejects.toThrow("Failed to save event: Error: Failed to save event");
    });
});