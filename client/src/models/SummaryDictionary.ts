import { ILoadSummary } from "../interfaces"

export type KeyValueLoadSummary = {
    key:string
    values : ILoadSummary[]
}

// export type SummaryDictionary = {
//     [key:string] : ILoadSummary[]
// }