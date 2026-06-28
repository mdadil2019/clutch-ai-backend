import { beforeEach, describe, expect, jest, test } from "@jest/globals";
import { Request, Response } from "express";
import { handleIncomingStream } from "./stream.controller";

const mockProcessStream = jest.fn<(url: string) => Promise<number>>();
jest.mock("../services/streams.service", () => {
    return jest.fn().mockImplementation(() => {
        return { processStream: mockProcessStream };
    });
});

describe("Stream Controller", () => {
    test("should return 400 for an invalid url", async () => {
        //Arrange
        const mockRequest = { query: { url: "htt://www.youtube.com/watch?v=dQw4w9WgXcQ" }
        } as unknown as Request;

        const mockResponse = {
            send: jest.fn(),
            status: jest.fn().mockReturnThis()
        } as unknown as Response;

        const mockNext = jest.fn();
        //Act
        await handleIncomingStream(mockRequest, mockResponse, mockNext);

        //Assert
        expect(mockNext).toHaveBeenCalledWith(expect.objectContaining({ statusCode: 400 }));
        expect(mockProcessStream).not.toHaveBeenCalled();
    }),

    test("should return 200 for a valid url and process the stream", async () => {
        //Arrange
        const url = "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
        const mockRequest = { query: { url: url}
        } as unknown as Request;
        
        const mockResponse = {
            send: jest.fn(),
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        } as unknown as Response;

        const mockNext = jest.fn();
        //Act
        await handleIncomingStream(mockRequest, mockResponse, mockNext);

        //Assert
        expect(mockProcessStream).toHaveBeenCalledWith(url);
        expect(mockResponse.json).toHaveBeenCalled();
        expect(mockResponse.status).not.toHaveBeenCalledWith(400);
        
    }),

    test("should handle error while processing stream and return appropriate error message", async () => {
        //Arrange
        const url = "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
        const mockRequest = { query: { url: url}
        } as unknown as Request;
        
        const mockResponse = {
            send: jest.fn(),
            status: jest.fn().mockReturnThis()
        } as unknown as Response;

        const mockError = new Error("Failed to process stream");
        mockProcessStream.mockImplementation(() => Promise.reject(mockError));

        const mockNext = jest.fn();
        //Act
        await handleIncomingStream(mockRequest, mockResponse,mockNext );
        
        //Assert
        expect(mockProcessStream).toHaveBeenCalledWith(url);
        expect(mockNext).toHaveBeenCalled()
    });
});