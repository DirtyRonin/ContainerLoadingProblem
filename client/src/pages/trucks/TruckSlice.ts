import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import type { RootState } from "../../store";
import { ITruck } from "../../models/Truck";
import { TruckApi } from "../../apis/trucksApi";
import { AsyncStatus } from "../../models/AsyncStatus";

// Define a type for the slice state
interface TruckState {
  trucks: ITruck[];
  loading: AsyncStatus;
}

// Define the initial state using that type
const initialState: TruckState = {
  trucks: [],
  loading: "idle",
};

export const FetchAllTrucks = createAsyncThunk(
  "trucks/fetchAllStatus",
  async () => {
    return await TruckApi.FetchTrucks();
  }
);

export const DeleteTruck = createAsyncThunk(
  "trucks/RemoveStatus",
  async (id: number, thunkAPI) => await TruckApi.DeleteTruck(id)
);

export const UpdateTruck = createAsyncThunk(
  "trucks/UpdateStatus",
  async (truck: ITruck, thunkAPI) => await TruckApi.UpdateTruck(truck)
);

export const CreateTruck = createAsyncThunk(
  "trucks/CreateStatus",
  async (truck: ITruck, thunkAPI) => await TruckApi.CreateTruck(truck)
);

export const truckSlice = createSlice({
  name: "trucks",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      //Fetch all
      .addCase(FetchAllTrucks.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(FetchAllTrucks.rejected, (state) => {
        state.loading = "failed";
      })
      .addCase(FetchAllTrucks.fulfilled, (state, action) => {
        state.trucks = action.payload;
        state.loading = "succeeded";
      })
      //Remove
      .addCase(DeleteTruck.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(DeleteTruck.rejected, (state) => {
        state.loading = "failed";
      })
      .addCase(DeleteTruck.fulfilled, (state, action) => {
        const index = state.trucks.findIndex((x) => x.id === +action.payload);
        state.trucks.splice(index, 1);
        
        state.loading = "succeeded";
      })
      // Update
      .addCase(UpdateTruck.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(UpdateTruck.rejected, (state) => {
        state.loading = "failed";
      })
      .addCase(UpdateTruck.fulfilled, (state, action) => {

        const index = state.trucks.findIndex((x) => x.id === action.payload.id);
        state.trucks[index] = action.payload
        state.loading = "succeeded";
      })
      // Create
      .addCase(CreateTruck.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(CreateTruck.rejected, (state) => {
        state.loading = "failed";
      })
      .addCase(CreateTruck.fulfilled, (state, action) => {
        state.trucks.push(action.payload);
        state.loading = "succeeded";
      });
  },
});

export const {} = truckSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const SelectTruckState = (state: RootState) => state.trucksGlobal;

export default truckSlice.reducer;
