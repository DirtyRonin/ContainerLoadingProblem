import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '../../store';
import { SummaryDictionary } from '../../../models';

// Define a type for the slice state
interface SummaryState {
  loadSummaries: SummaryDictionary;
  selectedloadSummaries: { cargoId: number; truckId: number; orderId: number }[];
}

// Define the initial state using that type
const initialState: SummaryState = {
  loadSummaries: {},
  selectedloadSummaries: [],
};
export const summarySlice = createSlice({
  name: 'summaryTree',
  initialState,
  reducers: {
    SetSummaries: (state, action: PayloadAction<SummaryDictionary>) => {
      state.loadSummaries = action.payload;
    },
    AddSelectedSummary: (state, action: PayloadAction<{ cargoId: number; truckId: number; orderId: number }>) => {
      state.selectedloadSummaries.push(action.payload);
    },
    RemoveSelectedSummary: (state, action: PayloadAction<{ cargoId: number; truckId: number; orderId: number }>) => {
      const index = state.selectedloadSummaries.findIndex(
        (x) => x.cargoId === action.payload.cargoId && x.truckId === action.payload.truckId
      );
      state.selectedloadSummaries.splice(index, 1);
    },
  },
});

export const { AddSelectedSummary, RemoveSelectedSummary, SetSummaries } = summarySlice.actions;

export const SelectSummaryState = (state: RootState) => state.summaryGlobal;

export default summarySlice.reducer;
