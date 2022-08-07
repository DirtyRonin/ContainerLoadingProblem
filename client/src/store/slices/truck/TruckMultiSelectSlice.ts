import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '../../store';

export interface ITruckMultiSelectState {
  selectedTruckIds: number[];
}

const initialState: ITruckMultiSelectState = {
  selectedTruckIds: [],
};

export const truckMultiSelectSlice = createSlice({
  name: 'truckMultiSelect',
  initialState,
  reducers: {
    AddTruckId: (state, action: PayloadAction<number>) => {
      state.selectedTruckIds.push(action.payload);
    },
    RemoveTruckId: (state, action: PayloadAction<number>) => {
      const index = state.selectedTruckIds.indexOf(action.payload)
      state.selectedTruckIds.splice(index, 1);
    },
    ClearMutliSelect: (state) => {
      state.selectedTruckIds = [];
    },
  },
});

export const { AddTruckId, RemoveTruckId, ClearMutliSelect } = truckMultiSelectSlice.actions;

export const SelectTruckMultiSelectState = (state: RootState) => state.truckMultiSelectGlobal;

export default truckMultiSelectSlice.reducer;
