import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import type { RootState } from "../../../store";
import { IOrder } from "../../../interfaces";
import { OrderApi } from "../../../apis/ordersApi";
import { AsyncStatus } from "../../../models/AsyncStatus";

interface OrderState{
    orders:IOrder[]
    loading:AsyncStatus
}

const initialState: OrderState = {
    orders: [],
    loading: "idle",
  };

  export const FetchAllOrder = createAsyncThunk(
    "orders/fetchAllStatus",
    async () => {
      return await OrderApi.FetchOrder();
    }
  );
  
  export const DeleteOrder = createAsyncThunk(
    "orders/RemoveStatus",
    async (id: number, thunkAPI) => await OrderApi.DeleteOrder(id)
  );
  
  export const UpdateOrder = createAsyncThunk(
    "orders/UpdateStatus",
    async (order: IOrder, thunkAPI) => await OrderApi.UpdateOrder(order)
  );
  
  export const CreateOrder = createAsyncThunk(
    "orders/CreateStatus",
    async (order: IOrder, thunkAPI) => await OrderApi.CreateOrder(order)
  );

  export const orderSlice = createSlice({
    name: "orders",
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {},
    extraReducers(builder) {
      builder
        //Fetch all
        .addCase(FetchAllOrder.pending, (state) => {
          state.loading = "pending";
        })
        .addCase(FetchAllOrder.rejected, (state) => {
          state.loading = "failed";
        })
        .addCase(FetchAllOrder.fulfilled, (state, action) => {
          state.orders = action.payload;
          state.loading = "succeeded";
        })
        //Remove
        .addCase(DeleteOrder.pending, (state) => {
          state.loading = "pending";
        })
        .addCase(DeleteOrder.rejected, (state) => {
          state.loading = "failed";
        })
        .addCase(DeleteOrder.fulfilled, (state, action) => {
          const index = state.orders.findIndex((x) => x.id === +action.payload);
          state.orders.splice(index, 1);
          
          state.loading = "succeeded";
        })
        // Update
        .addCase(UpdateOrder.pending, (state) => {
          state.loading = "pending";
        })
        .addCase(UpdateOrder.rejected, (state) => {
          state.loading = "failed";
        })
        .addCase(UpdateOrder.fulfilled, (state, action) => {
  
          const index = state.orders.findIndex((x) => x.id === action.payload.id);
          state.orders[index] = action.payload
          state.loading = "succeeded";
        })
        // Create
        .addCase(CreateOrder.pending, (state) => {
          state.loading = "pending";
        })
        .addCase(CreateOrder.rejected, (state) => {
          state.loading = "failed";
        })
        .addCase(CreateOrder.fulfilled, (state, action) => {
          state.orders.push(action.payload);
          state.loading = "succeeded";
        });
    },
  });
  
  export const {} = orderSlice.actions;
  
  export const SelectOrderState = (state: RootState) => state.ordersGlobal;
  
  export default orderSlice.reducer;