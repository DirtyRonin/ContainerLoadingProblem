import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import type { RootState } from "../..";

interface IOrderListState {
  selectedOrderId: string;
}

const initialState: IOrderListState = {
  selectedOrderId: '',
};

export const orderListSlice = createSlice({
  name: "orderList",
  initialState,
  reducers: {
    SelectOrderId: (state, action: PayloadAction<string>) => {
      state.selectedOrderId = action.payload;
    },
    UnselectOrderId: (state) => {
      state.selectedOrderId = '';
    },
  },
});

export const { SelectOrderId, UnselectOrderId } = orderListSlice.actions;

export const SelectOrderListState = (state: RootState) => state.orderListGlobal;

export default orderListSlice.reducer;
