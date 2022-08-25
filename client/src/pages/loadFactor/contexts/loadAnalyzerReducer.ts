import { ImmerReducer } from 'immer-reducer';
import { AsyncStatus, KeyValueLoadSummary } from '../../../models';
import { ILoadSummaryIds } from '../../../interfaces/ILoadSummaryIds';

export type stateProps = {
  readonly selectedTruckIds: number[];
  readonly selectedOrderIds: number[];
  readonly selectedLoadSummaryIds: ILoadSummaryIds[];
  readonly loadSummaries: KeyValueLoadSummary[];
  readonly fetchLoadSummariesLoading: AsyncStatus;

  addOrderId(orderId: number): void;
  removeOrderId(orderId: number): void;
  addTruckId(truckId: number): void;
  removeTruckId(truckId: number): void;
  addSelectedLoadSummaryIds(summary: ILoadSummaryIds): void;
  removeSelectedLoadSummaryIds(summary: ILoadSummaryIds): void;
  fetchAllLoadSummaries_Pending(): void;
  fetchAllLoadSummaries_Failed(): void;
  fetchAllLoadSummaries_Success(loadSummaries: KeyValueLoadSummary[]): void;
};

export const INITIAL_STATE: stateProps = {
  selectedTruckIds: [],
  selectedOrderIds: [],
  selectedLoadSummaryIds: [],
  loadSummaries: [],
  fetchLoadSummariesLoading: 'idle',
  addSelectedLoadSummaryIds: (summary: ILoadSummaryIds) => {},
  removeSelectedLoadSummaryIds: (summary: ILoadSummaryIds) => {},
  addOrderId: (orderId: number) => {},
  removeOrderId: (orderId: number) => {},
  addTruckId: (truckId: number) => {},
  removeTruckId: (truckId: number) => {},
  fetchAllLoadSummaries_Pending: () => {},
  fetchAllLoadSummaries_Failed: () => {},
  fetchAllLoadSummaries_Success: (loadSummaries: KeyValueLoadSummary[]) => {},
};

class LoadAnalyzerReducer extends ImmerReducer<stateProps> {
  // selected truck id
  addTruckId(truckId: number) {
    console.log(`adding truck id on an selected truck`);
    this.draftState.selectedTruckIds.push(truckId);
  }
  removeTruckId(truckId: number) {
    console.log(`removing truck id on an selected truck`);
    const index = this.draftState.selectedTruckIds.indexOf(truckId);
    this.draftState.selectedTruckIds.splice(index, 1);
  }

  // selected order id
  addOrderId(orderId: number) {
    console.log(`adding order id on an selected order`);
    this.draftState.selectedOrderIds.push(orderId);
  }
  removeOrderId(orderId: number) {
    console.log(`removing order id on an selected order`);
    const index = this.draftState.selectedOrderIds.indexOf(orderId);
    this.draftState.selectedOrderIds.splice(index, 1);
  }

  //selected load summary ids
  addSelectedLoadSummaryIds(summary: ILoadSummaryIds) {
    console.log(`adding a selected load summary `);
    this.draftState.selectedLoadSummaryIds.push(summary);
  }
  removeSelectedLoadSummaryIds(summary: ILoadSummaryIds) {
    console.log(`removing a selected load summary `);

    const index = this.draftState.selectedLoadSummaryIds.findIndex(
      (x) => x.cargoId === summary.cargoId && x.orderId === summary.orderId && x.truckId === summary.truckId
    );
    if (index === -1) return;

    this.draftState.selectedLoadSummaryIds.splice(index, 1);
  }

  fetchAllLoadSummaries_Pending() {
    console.log(`Fetching all load summaries in summary tree for analyzer started`);
    this.draftState.fetchLoadSummariesLoading = 'pending';
  }
  fetchAllLoadSummaries_Failed() {
    console.log(`Fetching all load summaries in summary tree for analyzer failed`);
    this.draftState.fetchLoadSummariesLoading = 'failed';
  }
  fetchAllLoadSummaries_Success(loadSummaries: KeyValueLoadSummary[]) {
    console.log(`Fetching all load summaries in summary tree for analyzer succeeded`);
    this.draftState.loadSummaries = loadSummaries;
    this.draftState.fetchLoadSummariesLoading = 'succeeded';
  }
}

export default LoadAnalyzerReducer;
