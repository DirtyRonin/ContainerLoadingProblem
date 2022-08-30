import _ from 'lodash';
import { produce } from 'immer';
import { ImmerReducer } from 'immer-reducer';
import { AsyncStatus, KeyValueLoadSummary } from '../../../models';
import { ILoadSummaryIds } from '../../../interfaces/ILoadSummaryIds';
import { ILoadSummary } from '../../../interfaces';
import { IAsyncRequest, initialAsyncRequest } from '../../../interfaces/IAsyncRequest';
import { GetValueById } from '../../../utils/shared/DictionaryHelper';

export type stateProps = {
  readonly selectedTruckIds: number[];
  readonly selectedOrderIds: number[];
  readonly selectedLoadSummaryIds: ILoadSummaryIds[];
  readonly loadSummaries: IAsyncRequest<KeyValueLoadSummary[]>;
  readonly addLoadSummaryLoading: AsyncStatus;

  addOrderId(orderId: number): void;
  removeOrderId(orderId: number): void;
  addTruckId(truckId: number): void;
  removeTruckId(truckId: number): void;
  addSelectedLoadSummaryIds(summary: ILoadSummaryIds): void;
  removeSelectedLoadSummaryIds(summary: ILoadSummaryIds): void;
  fetchAllLoadSummaries_Pending(): void;
  fetchAllLoadSummaries_Failed(e: Error): void;
  fetchAllLoadSummaries_Success(loadSummaries: KeyValueLoadSummary[]): void;
  AddSelectedLoadSummaries_Success(selectedLoadSummaries: ILoadSummary[]): void;
};

export const INITIAL_STATE: stateProps = {
  selectedTruckIds: [],
  selectedOrderIds: [],
  selectedLoadSummaryIds: [],
  loadSummaries: initialAsyncRequest<KeyValueLoadSummary[]>([]),
  addLoadSummaryLoading: 'idle',
  addSelectedLoadSummaryIds: (summary: ILoadSummaryIds) => {},
  removeSelectedLoadSummaryIds: (summary: ILoadSummaryIds) => {},
  addOrderId: (orderId: number) => {},
  removeOrderId: (orderId: number) => {},
  addTruckId: (truckId: number) => {},
  removeTruckId: (truckId: number) => {},
  fetchAllLoadSummaries_Pending: () => {},
  fetchAllLoadSummaries_Failed: (e: Error) => {},
  fetchAllLoadSummaries_Success: (loadSummaries: KeyValueLoadSummary[]) => {},
  AddSelectedLoadSummaries_Success: (selectedLoadSummaries: ILoadSummary[]) => {},
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
    console.log(`adding a selected load summary`);
    this.draftState.selectedLoadSummaryIds.push(summary);
    // this.addSelectedLoadSummary_Pending(summary);
  }
  removeSelectedLoadSummaryIds(summary: ILoadSummaryIds) {
    console.log(`removing a selected load summary `);

    const index = this.draftState.selectedLoadSummaryIds.findIndex(
      (x) => x.cargoId === summary.cargoId && x.orderId === summary.orderId && x.truckId === summary.truckId
    );
    if (index === -1) return;

    this.draftState.selectedLoadSummaryIds.splice(index, 1);
    // this.removeSelectedLoadSummary(summary);
  }

  addSelectedLoadSummary_Pending(summary: ILoadSummaryIds) {
    console.log(`start adding a selected load summary`);
    this.draftState.addLoadSummaryLoading = 'pending';
  }
  addSelectedLoadSummary_Failed() {
    console.log(`failed adding a selected load summary`);
    this.draftState.addLoadSummaryLoading = 'pending';
  }
  addSelectedLoadSummary_Success(summary: ILoadSummary) {
    console.log(`succeded adding a selected load summary`);
    const keyValueCollection = this.draftState.loadSummaries.value.find((x) => x.key === summary.truckId);
    if (keyValueCollection === undefined) {
      this.draftState.addLoadSummaryLoading = 'failed';
      throw new Error('containerId should be in loadsummaries');
    }

    keyValueCollection.values.push(summary);
    this.draftState.addLoadSummaryLoading = 'succeeded';
  }
  removeSelectedLoadSummary(summary: ILoadSummaryIds) {
    console.log(`removing a selected load summary`);
    const keyValueCollection = this.draftState.loadSummaries.value.find((x) => x.key === summary.truckId);
    if (keyValueCollection === undefined) {
      this.draftState.addLoadSummaryLoading = 'failed';
      throw new Error('containerId should be in loadsummaries');
    }
    const index = keyValueCollection.values.findIndex((x) => x.cargoId === summary.cargoId);
    if (index === -1) return;

    keyValueCollection.values.splice(index, 1);
  }

  fetchAllLoadSummaries_Pending() {
    console.log(`Fetching all load summaries in summary tree for analyzer started`);
    this.draftState.loadSummaries.status = 'pending';
    this.draftState.loadSummaries.error = '';
  }
  fetchAllLoadSummaries_Failed(e: Error) {
    console.log(`Fetching all load summaries in summary tree for analyzer failed`);
    this.draftState.loadSummaries.status = 'failed';
    this.draftState.loadSummaries.error = e.message;
  }
  fetchAllLoadSummaries_Success(loadSummaries: KeyValueLoadSummary[]) {
    console.log(`Fetching all load summaries in summary tree for analyzer succeeded`);
    this.draftState.loadSummaries.value = loadSummaries;
    this.draftState.loadSummaries.status = 'succeeded';
  }
  AddSelectedLoadSummaries_Success(selectedLoadSummaries: ILoadSummary[]) {
    console.log(`Adding selected load summaries succeeded`);

    const truckGroups = _.groupBy(selectedLoadSummaries, (selected) => selected.truckId);

    Object.keys(truckGroups).forEach((key) => {
      const tryGetSummaries = GetValueById(+key, this.draftState.loadSummaries.value);

      if (tryGetSummaries === undefined) this.draftState.loadSummaries.value.push({ key: +key, values: truckGroups[+key] });
      else truckGroups[+key].forEach((summary) => tryGetSummaries.values.push(summary));
    });
  }
}

export default LoadAnalyzerReducer;
