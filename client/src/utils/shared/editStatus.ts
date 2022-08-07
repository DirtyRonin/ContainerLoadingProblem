export type EditStatus = 'Update' | 'Create' | 'Readonly'

export function GetEditStatus(id:number, isReadonly = false):EditStatus {
    if(isReadonly) return 'Readonly'
    if(id < 1) return 'Create'

    return 'Update'
}