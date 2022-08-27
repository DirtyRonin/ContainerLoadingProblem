import cloneDeep from 'lodash/cloneDeep'
import immer from 'immer'

export const AsDeepCopy= <T>(object:T):T=> cloneDeep(object)