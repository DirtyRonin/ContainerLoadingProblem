import { ICargo, ILoadAnalyzer, ITruck } from '../interfaces';
import { myContainer } from '../inversify.config';
import { TYPES } from '../utils/shared/registerSymbols';

import { TruckApi } from '../apis/trucksApi';
import { CargoApi } from '../apis/cargoApi';
import { ILoadSummaryIds } from '../interfaces/ILoadSummaryIds';

class LoadSummaryService {
  private _loadAnalyzer = myContainer.get<ILoadAnalyzer>(TYPES.LoadAnalyzer);

  private fetchTruck(id: number): Promise<ITruck> {
    return TruckApi.FetchTruckById(id);
  }

  private fetchCargo(id: number): Promise<ICargo> {
    return CargoApi.FetchCargoById(id);
  }

  public async addSelectedLoadSummary(ids: ILoadSummaryIds) {
    return Promise.all([this.fetchCargo(ids.cargoId), this.fetchTruck(ids.truckId)]).then((results) =>
      this._loadAnalyzer.AnalyseSingleLoad(results[0], results[1])
    );
  }
}

export default LoadSummaryService;
