import { ImmerReducer } from 'immer-reducer';
import { ICargo, ILoadSummary, IPopulatedCargo, IPopulatedTruckLoading, ITruck, ITruckLoading, ToPopulatedCargo } from '../../../interfaces';
import { IAsyncRequest, initialAsyncRequest } from '../../../interfaces/IAsyncRequest';

export type stateProps = {
  readonly cargos: IAsyncRequest<IPopulatedCargo[]>;
  readonly trucks: IAsyncRequest<ITruck[]>;
  readonly populatedTruckLoadings: IAsyncRequest<ITruckLoading[]>;
};

export const INITIAL_STATE: stateProps = {
  cargos: initialAsyncRequest([]),
  trucks: initialAsyncRequest([]),
  populatedTruckLoadings: initialAsyncRequest([]),
  
};

class SummaryTreeReducer extends ImmerReducer<stateProps> {
  // Async Actions
  fetchAllCargos_Pending() {
    console.log(`Fetching all cargos for selected order ids in summary tree for analyzer started`);
    this.draftState.cargos.status = 'pending';
  }
  fetchAllCargos_Failed() {
    console.log(`Fetching all cargos for selected order ids in summary tree for analyzer failed`);
    this.draftState.cargos.status = 'failed';
  }
  fetchAllCargos_Success(cargos: IPopulatedCargo[]) {
    console.log(`Fetching all cargos for selected order ids in summary tree for analyzer succeeded`);
    this.draftState.cargos.value = cargos;
    this.draftState.cargos.status = 'succeeded';
  }

  fetchAllTrucks_Pending() {
    console.log(`Fetching all trucks for selected truck ids in summary tree for analyzer started`);
    this.draftState.trucks.status = 'pending';
  }
  fetchAllTrucks_Failed() {
    console.log(`Fetching all trucks for selected truck ids in summary tree for analyzer failed`);
    this.draftState.trucks.status = 'failed';
  }
  fetchAllTrucks_Success(trucks: ITruck[]) {
    console.log(`Fetching all trucks for selected truck ids in summary tree for analyzer succeeded`);
    this.draftState.trucks.value = trucks;
    this.draftState.trucks.status = 'succeeded';
  }

  FilterTruckLoadingByRouteId_Pending() {
    console.log(`Fetching all trucks for selected truck ids in summary tree for analyzer started`);
    this.draftState.populatedTruckLoadings.status = 'pending';
  }
  FilterTruckLoadingByRouteId_Failed() {
    console.log(`Fetching all trucks for selected truck ids in summary tree for analyzer failed`);
    this.draftState.populatedTruckLoadings.status = 'failed';
  }
  FilterTruckLoadingByRouteId_Success(populatedTruckLoadings: IPopulatedTruckLoading[]) {
    console.log(`Fetching all trucks for selected truck ids in summary tree for analyzer succeeded`);

    const initialize: { cargos: IPopulatedCargo[]; trucks: ITruck[] } = { cargos: [], trucks: [] };

    /** these are saved values from the db and will replace the current seletecion in the ui */
    const newState = populatedTruckLoadings.reduce((prev, current) => {
      if (current.trucks.length !== 1) return prev;

      const isPopulatedCargo = ToPopulatedCargo(current);
      if (!isPopulatedCargo) return prev;

      prev.cargos.push(isPopulatedCargo);
      prev.trucks.push(current.trucks[0]);

      return prev;
    }, initialize);

    this.draftState.populatedTruckLoadings.value = populatedTruckLoadings;
    this.draftState.populatedTruckLoadings.status = 'succeeded';
    this.draftState.cargos.value = newState.cargos;
    this.draftState.trucks.value = newState.trucks;
  }
}

export default SummaryTreeReducer;
