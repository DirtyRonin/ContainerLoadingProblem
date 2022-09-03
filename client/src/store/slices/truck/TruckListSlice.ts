import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '../../store';

export interface ITruckListState {
  selectedTruckId: string;
}

const initialState: ITruckListState = {
  selectedTruckId: '',
};

export const truckListSlice = createSlice({
  name: 'truckList',
  initialState,
  reducers: {
    SelectTruckId: (state: ITruckListState, action: PayloadAction<string>) => {
      state.selectedTruckId = action.payload;
    },
    UnselectTruckId: (state) => {
      state.selectedTruckId = '';
    },
  },
});

export const { SelectTruckId, UnselectTruckId } = truckListSlice.actions;

export const SelectTruckListState = (state: RootState) => state.truckListGlobal;

export default truckListSlice.reducer;
