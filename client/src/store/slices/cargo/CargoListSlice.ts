import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '../../store';
import { DeleteCargo } from './CargoSlice';

interface ICargoListState {
  selectedCargoId: string;
}

const initialState: ICargoListState = {
  selectedCargoId: '',
};

export const cargoListSlice = createSlice({
  name: 'cargoList',
  initialState,
  reducers: {
    SelectCargoId: (state, action: PayloadAction<string>) => {
      state.selectedCargoId = action.payload;
    },
    UnselectCargoId: (state) => {
      state.selectedCargoId = initialState.selectedCargoId;
    },
  },
  extraReducers(builder) {
    builder.addCase(DeleteCargo.fulfilled, (state, action) => {
      state.selectedCargoId = initialState.selectedCargoId;
    });
  },
});

export const { SelectCargoId, UnselectCargoId } = cargoListSlice.actions;

export const SelectCargoListState = (state: RootState) => state.cargoListGlobal;

export default cargoListSlice.reducer;
