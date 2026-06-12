import AnalysisEventsType from "../types/analysisevent"

interface IVideoAnalysisObserver {
    onEvent(event: AnalysisEventsType): void;
}

export default IVideoAnalysisObserver;