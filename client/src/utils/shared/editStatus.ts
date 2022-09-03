import { IsStringEmpty } from "./common"

export type EditStatus = 'Update' | 'Create' | 'Readonly'

export function GetEditStatus(id:string, isReadonly = false):EditStatus {
    if(isReadonly) return 'Readonly'
    if(IsStringEmpty(id)) return 'Create'

    return 'Update'
}