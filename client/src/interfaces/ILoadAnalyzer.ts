import { ICargo, IContainer, ILoadSummary } from '.';

export interface ILoadAnalyzer {
  AnalyzeLoading(cargo: ICargo[], containers: IContainer[]): Promise<number>;
  AnalyseSingleLoad(singleCargo: ICargo, container: IContainer): Promise<ILoadSummary>;
  
}
