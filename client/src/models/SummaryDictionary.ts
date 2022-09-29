import { ILoadSummary } from "../interfaces"

export type KeyValueLoadSummary = {
    /** truck id */
    key:string
    values : ILoadSummary[]
}

// export type SummaryDictionary = {
//     [key:string] : ILoadSummary[]
// }