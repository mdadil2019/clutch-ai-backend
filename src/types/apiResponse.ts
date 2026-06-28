export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
}

export function successResponse<T>(data: T): ApiResponse<T> {
    return { success: true, data };
}

export function errorResponse(message: string): ApiResponse<null> {
    return { success: false, error: message };
}
