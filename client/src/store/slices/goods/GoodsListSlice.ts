import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '../../store';
import {DeleteGoods} from './GoodsSlice'
import { IGoods } from '../../../interfaces';
import { Goods } from '../../../models';

interface IGoodsListState {
  selectedSingleGoods: IGoods;
}

const initialState: IGoodsListState = {
  selectedSingleGoods: Goods.AsInitializeDefault(),
};

export const goodsListSlice = createSlice({
  name: 'goodsList',
  initialState,
  reducers: {
    SelectSingleGoods: (state, action: PayloadAction<IGoods>) => {
      state.selectedSingleGoods = action.payload;
    },
    UnselectSingleGoods: (state) => {
      state.selectedSingleGoods = initialState.selectedSingleGoods;
    },
  },
  extraReducers(builder) {
    builder
    .addCase(DeleteGoods.fulfilled, (state, action) => {
      state.selectedSingleGoods = initialState.selectedSingleGoods;
    })
  }
});

export const { SelectSingleGoods, UnselectSingleGoods } = goodsListSlice.actions;

export const SelectGoodsListState = (state: RootState) => state.goodsListGlobal;

export default goodsListSlice.reducer;
