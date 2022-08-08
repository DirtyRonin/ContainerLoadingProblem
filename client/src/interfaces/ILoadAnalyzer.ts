import { ICargo, IContainer, ILoadSummary, ITruck } from '.';

export interface ILoadAnalyzer {
  AnalyzeLoading(cargo: ICargo[], containers: IContainer[]): Promise<number>;
  AnalyseSingleLoad(singleCargo: ICargo, container: IContainer): Promise<ILoadSummary>;
  AnalyzeLoadingForSummaries(cargos: ICargo[], containers: ITruck[]): Promise<{ [key: number]: ILoadSummary[] }>
  
}
