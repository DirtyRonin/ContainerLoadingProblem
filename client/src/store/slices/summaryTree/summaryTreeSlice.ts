import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '../../store';
import { KeyValueLoadSummary } from '../../../models';

// Define a type for the slice state
interface SummaryState {
  readonly selectedTruckIds: string[];
  readonly selectedOrderIds: string[];
  readonly loadSummaries: KeyValueLoadSummary[];
  readonly selectedloadSummaries: { cargoId: string; truckId: string; orderId: string }[];
}

// Define the initial state using that type
const initialState: SummaryState = {
  selectedTruckIds: [],
  selectedOrderIds: [],
  loadSummaries: [],
  selectedloadSummaries: [],
};
export const summarySlice = createSlice({
  name: 'summaryTree',
  initialState,
  reducers: {
    SetSummaries: (state, action: PayloadAction<KeyValueLoadSummary[]>) => {
      state.loadSummaries = action.payload;
    },
    AddSelectedSummary: (state, action: PayloadAction<{ cargoId: string; truckId: string; orderId: string }>) => {
      state.selectedloadSummaries.push(action.payload);
    },
    RemoveSelectedSummary: (state, action: PayloadAction<{ cargoId: string; truckId: string; orderId: string }>) => {
      const index = state.selectedloadSummaries.findIndex((x) => x.cargoId === action.payload.cargoId && x.truckId === action.payload.truckId);
      state.selectedloadSummaries.splice(index, 1);
    },
    AddTruckId: (state, action: PayloadAction<string>) => {
      console.log(`Add selected truck id ${action.payload}`);
      state.selectedTruckIds.push(action.payload);
    },
    RemoveTruckId: (state, action: PayloadAction<string>) => {
      console.log(`Remove selected truck id ${action.payload}`);
      const index = state.selectedTruckIds.indexOf(action.payload);
      state.selectedTruckIds.splice(index, 1);
    },
    ClearTruckIds: (state) => {
      state.selectedTruckIds = [];
    },
    AddOrderId: (state, action: PayloadAction<string>) => {
      console.log(`Add selected order id ${action.payload}`);
      state.selectedOrderIds.push(action.payload);
    },
    RemoveOrderId: (state, action: PayloadAction<string>) => {
      console.log(`Remove selected order id ${action.payload}`);
      const index = state.selectedOrderIds.indexOf(action.payload);
      state.selectedOrderIds.splice(index, 1);
    },
    ClearOrderIds: (state) => {
      state.selectedOrderIds = [];
    },
  },
});

export const { AddSelectedSummary, RemoveSelectedSummary, SetSummaries, AddTruckId, RemoveTruckId, ClearTruckIds, AddOrderId, RemoveOrderId, ClearOrderIds } =
  summarySlice.actions;

export const SelectSummaryState = (state: RootState) => state.summaryGlobal;

export default summarySlice.reducer;
