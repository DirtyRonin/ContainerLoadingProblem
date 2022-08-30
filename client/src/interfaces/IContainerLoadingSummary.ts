import { ICargo } from "./ICargo";
import { ILoadSummary } from "./ILoadSummary";
import { ITruck } from "./ITruck";

export interface IContainerLoadingSummary{
    truck:ITruck
    summaries:ILoadSummary[]
    remainingLoadingMeterOfTruck:number
}