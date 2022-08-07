import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '../../store';
import { DeleteCargo } from './CargoSlice';
import { ICargo } from '../../../interfaces';
import { Cargo } from '../../../models';

interface ICargoListState {
  selectedCargo: ICargo;
}

const initialState: ICargoListState = {
  selectedCargo: Cargo.AsInitializeDefault(),
};

export const cargoListSlice = createSlice({
  name: 'cargoList',
  initialState,
  reducers: {
    SelectCargo: (state, action: PayloadAction<ICargo>) => {
      state.selectedCargo = action.payload;
    },
    UnselectCargo: (state) => {
      state.selectedCargo = initialState.selectedCargo;
    },
  },
  extraReducers(builder) {
    builder.addCase(DeleteCargo.fulfilled, (state, action) => {
      state.selectedCargo = initialState.selectedCargo;
    });
  },
});

export const { SelectCargo, UnselectCargo } = cargoListSlice.actions;

export const SelectCargoListState = (state: RootState) => state.cargoListGlobal;

export default cargoListSlice.reducer;
