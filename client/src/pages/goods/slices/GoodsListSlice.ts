import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import type { RootState } from "../../../store";

interface IGoodsListState {
  selectedGoodsId: number;
}

const initialState: IGoodsListState = {
  selectedGoodsId: 0,
};

export const goodsListSlice = createSlice({
  name: "goodsList",
  initialState,
  reducers: {
    SelectGoodsId: (state, action: PayloadAction<number>) => {
      state.selectedGoodsId = action.payload;
    },
    UnselectGoodsId: (state) => {
      state.selectedGoodsId = 0;
    },
  },
});

export const { SelectGoodsId, UnselectGoodsId } = goodsListSlice.actions;

export const SelectGoodsListState = (state: RootState) => state.goodsListGlobal;

export default goodsListSlice.reducer;
