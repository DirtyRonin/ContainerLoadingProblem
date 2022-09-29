import { IEntity } from '../../interfaces';
import { IsStringEmpty } from './common';

export type EditStatus = 'Update' | 'Create' | 'Readonly';

/** Is True if entity has the status 'Update' ==> valid id ==> existing entity*/
export const HasUpdateState = (entity: IEntity, isReadonly = false): boolean => GetEditStatus(entity, isReadonly) === 'Update';

/** Get the edit status depending. If the id is an empty string return 'Create', else 'Update' 
 *  Returns status 'Readonly' if the 'isReadonly' flag is set true
 */
export function GetEditStatus(entity: IEntity, isReadonly = false): EditStatus {
  if (isReadonly) return 'Readonly';
  if (IsStringEmpty(entity._id)) return 'Create';

  return 'Update';
}
