import { ILoadSummary } from "../interfaces"

export type SummaryDictionary = {
    key:number
    summaries : ILoadSummary[]
}[]

export type KeyValueLoadSummary = {
    key:number
    values : ILoadSummary[]
}

// export type SummaryDictionary = {
//     [key:number] : ILoadSummary[]
// }