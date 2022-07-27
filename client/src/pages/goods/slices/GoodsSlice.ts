import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import type { RootState } from "../../../store";
import { IGoods } from "../../../models/Goods";
import { GoodsApi } from "../../../apis/goodsApi";
import { AsyncStatus } from "../../../models/AsyncStatus";

interface GoodsState{
    goods:IGoods[]
    loading:AsyncStatus
}

const initialState: GoodsState = {
    goods: [],
    loading: "idle",
  };

  

  export const FetchAllGoods = createAsyncThunk(
    "goods/fetchAllStatus",
    async () => {
      return await GoodsApi.FetchGoods();
    }
  );
  
  export const DeleteGoods = createAsyncThunk(
    "goods/RemoveStatus",
    async (id: number, thunkAPI) => await GoodsApi.DeleteGood(id)
  );
  
  export const UpdateGoods = createAsyncThunk(
    "goods/UpdateStatus",
    async (good: IGoods, thunkAPI) => await GoodsApi.UpdateGood(good)
  );
  
  export const CreateGoods = createAsyncThunk(
    "goods/CreateStatus",
    async (good: IGoods, thunkAPI) => await GoodsApi.CreateGood(good)
  );

  export const goodSlice = createSlice({
    name: "goods",
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {},
    extraReducers(builder) {
      builder
        //Fetch all
        .addCase(FetchAllGoods.pending, (state) => {
          state.loading = "pending";
        })
        .addCase(FetchAllGoods.rejected, (state) => {
          state.loading = "failed";
        })
        .addCase(FetchAllGoods.fulfilled, (state, action) => {
          state.goods = action.payload;
          state.loading = "succeeded";
        })
        //Remove
        .addCase(DeleteGoods.pending, (state) => {
          state.loading = "pending";
        })
        .addCase(DeleteGoods.rejected, (state) => {
          state.loading = "failed";
        })
        .addCase(DeleteGoods.fulfilled, (state, action) => {
          const index = state.goods.findIndex((x) => x.id === +action.payload);
          state.goods.splice(index, 1);
          
          state.loading = "succeeded";
        })
        // Update
        .addCase(UpdateGoods.pending, (state) => {
          state.loading = "pending";
        })
        .addCase(UpdateGoods.rejected, (state) => {
          state.loading = "failed";
        })
        .addCase(UpdateGoods.fulfilled, (state, action) => {
  
          const index = state.goods.findIndex((x) => x.id === action.payload.id);
          state.goods[index] = action.payload
          state.loading = "succeeded";
        })
        // Create
        .addCase(CreateGoods.pending, (state) => {
          state.loading = "pending";
        })
        .addCase(CreateGoods.rejected, (state) => {
          state.loading = "failed";
        })
        .addCase(CreateGoods.fulfilled, (state, action) => {
          state.goods.push(action.payload);
          state.loading = "succeeded";
        });
    },
  });
  
  export const {} = goodSlice.actions;
  
  // Other code such as selectors can use the imported `RootState` type
  export const SelectGoodsState = (state: RootState) => state.goodsGlobal;
  
  export default goodSlice.reducer;