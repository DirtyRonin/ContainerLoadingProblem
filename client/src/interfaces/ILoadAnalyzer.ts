import { ICargo, IContainer, ILoadSummary, ITruck } from '.';
import { KeyValueLoadSummary } from '../models';

export interface ILoadAnalyzer {
  AnalyzeLoading(cargo: ICargo[], containers: IContainer[]): Promise<number>;
  AnalyseSingleLoad(singleCargo: ICargo, container: IContainer): Promise<ILoadSummary>;
  AnalyzeLoadingForSummaries(cargos: ICargo[], containers: ITruck[]): Promise<KeyValueLoadSummary[]>
}
