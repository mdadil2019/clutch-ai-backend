import { AnalysisEvent } from "../types/analysisevent"

interface IVideoAnalysisObserver {
    onEvent(event: AnalysisEvent): Promise<void>;
}

export default IVideoAnalysisObserver;