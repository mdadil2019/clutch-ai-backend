enum AnalysisEventsType{
    PROCESSING_STARTED = "processing_started",
    PROCESSING_IN_PROGRESS = "processing_in_progress",
    GENERATING_HIGHLIGHTS = "generating_highlights",
    COMPLETED = "completed",
    ERROR = "error"
}

type AnalysisEvent = {
    type: AnalysisEventsType;
    streamId: number;
}
export type {AnalysisEvent};

export default AnalysisEventsType;