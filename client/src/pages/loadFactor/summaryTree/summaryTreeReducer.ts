import { ImmerReducer } from 'immer-reducer';
import { ICargo, ILoadSummary, ITruck } from '../../../interfaces';
import { AsyncStatus, KeyValueLoadSummary } from '../../../models';

export type stateProps = {
  readonly cargos: ICargo[];
  readonly trucks: ITruck[];
  readonly selectedLoadSummaries:ILoadSummary[]
  readonly fetchCargoLoading: AsyncStatus;
  readonly fetchTruckLoading: AsyncStatus;
};

export const INITIAL_STATE: stateProps = {
  cargos: [],
  trucks: [],
  selectedLoadSummaries:[],
  fetchCargoLoading: 'idle',
  fetchTruckLoading: 'idle',
};

class SummaryTreeReducer extends ImmerReducer<stateProps> {
  // Async Actions
  fetchAllCargos_Pending() {
    console.log(`Fetching all cargos for selected order ids in summary tree for analyzer started`);
    this.draftState.fetchCargoLoading = 'pending';
  }
  fetchAllCargos_Failed() {
    console.log(`Fetching all cargos for selected order ids in summary tree for analyzer failed`);
    this.draftState.fetchCargoLoading = 'failed';
  }
  fetchAllCargos_Success(cargos: ICargo[]) {
    console.log(`Fetching all cargos for selected order ids in summary tree for analyzer succeeded`);
    this.draftState.cargos = cargos;
    this.draftState.fetchCargoLoading = 'succeeded';
  }

  fetchAllTrucks_Pending() {
    console.log(`Fetching all trucks for selected truck ids in summary tree for analyzer started`);
    this.draftState.fetchTruckLoading = 'pending';
  }
  fetchAllTrucks_Failed() {
    console.log(`Fetching all trucks for selected truck ids in summary tree for analyzer failed`);
    this.draftState.fetchTruckLoading = 'failed';
  }
  fetchAllTrucks_Success(trucks: ITruck[]) {
    console.log(`Fetching all trucks for selected truck ids in summary tree for analyzer succeeded`);
    this.draftState.trucks = trucks;
    this.draftState.fetchTruckLoading = 'succeeded';
  }

  
}

export default SummaryTreeReducer;
