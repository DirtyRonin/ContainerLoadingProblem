import { IContainerHelper, ILoadSummary, ITruck } from '../../interfaces';
import { IContainerLoading } from '../../interfaces/IContainerLoading';
import { IContainerLoadingSummary } from '../../interfaces/IContainerLoadingSummary';
import { KeyValueLoadSummary } from '../../models';
import { SortTrucks, SortGeneric } from '../../utils/shared/ImmutableHelper';
import { GetValueById, FilterAvailableLoadSummariesByUnavailableCargoIds } from '../../utils/shared/DictionaryHelper';
import { inject, injectable } from 'inversify';
import { TYPES } from '../../utils/shared/registerSymbols';

@injectable()
class ContainerLoading implements IContainerLoading {
  @inject(TYPES.ContainerHelper) 
  private _containerHelper: IContainerHelper

  public SplitCargosOnTrucks(trucks: ITruck[], summaries: KeyValueLoadSummary[]): IContainerLoadingSummary[] {
    const results: IContainerLoadingSummary[] = [];

    const _sortedTrucksDesc = SortTrucks(trucks, this._containerHelper.CompareByVolume);

    const unavailableCargoIds: string[] = [];

    for (let index = 0; index < _sortedTrucksDesc.length; index++) {
      const availableLoadSummaries = FilterAvailableLoadSummariesByUnavailableCargoIds(unavailableCargoIds, summaries);

      const currentTruck = _sortedTrucksDesc[index];

      const keyValuePair = GetValueById(currentTruck._id, availableLoadSummaries);
      if (!keyValuePair) throw new Error('Truck id is missing in summaries while splitting cargos on trucks');

      const loadingResults = this.SplitCargosOnTruck(currentTruck, keyValuePair.values);

      loadingResults.summaries.forEach((x) => unavailableCargoIds.push(x.cargoId));

      results.push(loadingResults);
    }

    return results;
  }

  SplitCargosOnTruck(truck: ITruck, summaries: ILoadSummary[]): IContainerLoadingSummary {
    const sortedSummariesDesc = SortGeneric(summaries, this._containerHelper.CompareByLoadingMeter);

    const assignedSummaries: ILoadSummary[] = [];

    const remainingLoadingMeterOfTruck = sortedSummariesDesc.reduce((prev, current) => {
      if (prev > current.loadingMeter) {
        assignedSummaries.push(current);
        // console.log(`prev (${prev}) - current loading meter (${current.loadingMeter})`);
        prev -= current.loadingMeter;
      }

      return prev;
    }, truck.length);

    return { truck, summaries: assignedSummaries, remainingLoadingMeterOfTruck };
  }
}

export default ContainerLoading;
