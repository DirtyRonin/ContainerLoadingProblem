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
  selectedCargo: { 
    id:0,
    truckId:null,
    orderId:0,
    name:'',
    width:0,
    length:0,
    weight:0,
    quantity:0,
    isStackable:false,
    height:0 ,
  },
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
