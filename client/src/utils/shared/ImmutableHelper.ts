import cloneDeep from 'lodash/cloneDeep';
import immer, { Draft, produce } from 'immer';
import { IContainer, ILoadSummary, ITruck } from '../../interfaces';

export const AsDeepCopy = <T>(object: T): T => cloneDeep(object);

export const SortTrucks = (trucks: ITruck[], compare: (a: IContainer, b: IContainer) => number) => produce(trucks, (draft) => draft.sort(compare));

export const SortLoadSummaries = (summaries: ILoadSummary[], compare: (a: ILoadSummary, b: ILoadSummary) => number) =>
  produce(summaries, (draft) => {
    draft.sort(compare);
  });
export const SortGeneric = <T>(values: T[], compare: (a: Draft<T>, b: Draft<T>) => number) => produce(values, (draft) => draft.sort(compare));
