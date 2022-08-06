import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import type { RootState } from "../..";

interface IOrderListState {
  selectedOrderId: number;
}

const initialState: IOrderListState = {
  selectedOrderId: 0,
};

export const orderListSlice = createSlice({
  name: "orderList",
  initialState,
  reducers: {
    SelectOrderId: (state, action: PayloadAction<number>) => {
      state.selectedOrderId = action.payload;
    },
    UnselectOrderId: (state) => {
      state.selectedOrderId = 0;
    },
  },
});

export const { SelectOrderId, UnselectOrderId } = orderListSlice.actions;

export const SelectOrderListState = (state: RootState) => state.orderListGlobal;

export default orderListSlice.reducer;
