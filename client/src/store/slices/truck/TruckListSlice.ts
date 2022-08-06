import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import type { RootState } from "../../store";

export interface ITruckListState {
  selectedTruckId: number;
}

const initialState: ITruckListState = {
  selectedTruckId: 0,
};

export const tuckListSlice = createSlice({
  name: "truckList",
  initialState,
  reducers: {
    SelectTruckId: (state, action: PayloadAction<number>) => {
      state.selectedTruckId = action.payload;
    },
    UnselectTruckId: (state) => {
      state.selectedTruckId = 0;
    },
  },
});

export const { SelectTruckId, UnselectTruckId } = tuckListSlice.actions;

export const SelectTruckListState = (state: RootState) => state.truckListGlobal;

export default tuckListSlice.reducer;
