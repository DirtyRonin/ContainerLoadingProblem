import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '../../store';

export interface IOrderMultiSelectState {
  selectedOrderIds: number[];
}

const initialState: IOrderMultiSelectState = {
  selectedOrderIds: [],
};

export const OrderMultiSelectSlice = createSlice({
  name: 'OrderMultiSelect',
  initialState,
  reducers: {
    AddOrderId: (state, action: PayloadAction<number>) => {
      state.selectedOrderIds.push(action.payload);
    },
    RemoveOrderId: (state, action: PayloadAction<number>) => {
      const index = state.selectedOrderIds.indexOf(action.payload)
      state.selectedOrderIds.splice(index, 1);
    },
    ClearMutliSelect: (state) => {
      state.selectedOrderIds = [];
    },
  },
});

export const { AddOrderId, RemoveOrderId, ClearMutliSelect } = OrderMultiSelectSlice.actions;

export const SelectOrderMultiSelectState = (state: RootState) => state.orderMultiSelectGlobal;

export default OrderMultiSelectSlice.reducer;
