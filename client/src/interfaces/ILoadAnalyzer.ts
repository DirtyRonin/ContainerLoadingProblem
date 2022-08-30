import { ICargo, IContainer, ILoadSummary, ITruck } from '.';
import { KeyValueLoadSummary } from '../models';
import { ILoadSummaryIds } from './ILoadSummaryIds';

export interface ILoadAnalyzer {
  AnalyzeLoading(cargo: ICargo[], trucks: ITruck[]): Promise<number>;
  AnalyseSingleLoad(singleCargo: ICargo, truck: ITruck): Promise<ILoadSummary>;
  AnalyzeLoadingForSummaries(cargos: ICargo[], truck: ITruck[],selectedLoadSummaries: ILoadSummaryIds[]): Promise<KeyValueLoadSummary[]>
}
