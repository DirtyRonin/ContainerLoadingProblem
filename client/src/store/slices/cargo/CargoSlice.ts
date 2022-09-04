import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import type { RootState } from '../../store';
import { ICargo } from '../../../interfaces';
import { CargoApi } from '../../../apis/cargoApi';
import { AsyncStatus } from '../../../models/AsyncStatus';

interface CargoState {
  cargos: ICargo[];
  loading: AsyncStatus;
}

const initialState: CargoState = {
  cargos: [],
  loading: 'idle',
};

export const FetchAllCargo = createAsyncThunk('cargos/fetchAllStatus', async () => {
  return await CargoApi.FetchCargo();
});
// export const FetchCargoIdsWithOrderId = createAsyncThunk('cargos/filterByOrderIdStatus', async (oderId:string) => {
//   return await CargoApi.FilterCargosIdByOrderIds([oderId]);
// });
export const FetchCargoByOrderIds = createAsyncThunk('cargos/filterByOrderIdsStatus', async (oderIds:string[]) => {
  return await CargoApi.FilterCargosByOrderIds(oderIds);
});

export const DeleteCargo = createAsyncThunk('cargos/RemoveStatus', async (id: string, thunkAPI) => await CargoApi.DeleteCargo(id));

export const UpdateCargo = createAsyncThunk('cargos/UpdateStatus', async (cargo: ICargo, thunkAPI) => await CargoApi.UpdateCargo(cargo));

export const CreateCargo = createAsyncThunk('cargos/CreateStatus', async (cargo: ICargo, thunkAPI) => await CargoApi.CreateCargo(cargo));

export const cargoSlice = createSlice({
  name: 'cargos',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      //Fetch all
      .addCase(FetchAllCargo.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(FetchAllCargo.rejected, (state) => {
        state.loading = 'failed';
      })
      .addCase(FetchAllCargo.fulfilled, (state, action) => {
        state.cargos = action.payload;
        state.loading = 'succeeded';
      })
      
      //Remove
      .addCase(DeleteCargo.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(DeleteCargo.rejected, (state) => {
        state.loading = 'failed';
      })
      .addCase(DeleteCargo.fulfilled, (state, action) => {
        const index = state.cargos.findIndex((x) => x._id === action.payload);
        state.cargos.splice(index, 1);

        state.loading = 'succeeded';
      })
      // Update
      .addCase(UpdateCargo.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(UpdateCargo.rejected, (state) => {
        state.loading = 'failed';
      })
      .addCase(UpdateCargo.fulfilled, (state, action) => {
        const index = state.cargos.findIndex((x) => x._id === action.payload._id);
        state.cargos[index] = action.payload;
        state.loading = 'succeeded';
      })
      // Create
      .addCase(CreateCargo.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(CreateCargo.rejected, (state) => {
        state.loading = 'failed';
      })
      .addCase(CreateCargo.fulfilled, (state, action) => {
        state.cargos.push(action.payload);
        state.loading = 'succeeded';
      })
      // //Fetch cargo ids and order Ids
      // .addCase(FetchCargoIdsWithOrderId.pending, (state) => {
      //   state.loading = 'pending';
      // })
      // .addCase(FetchCargoIdsWithOrderId.rejected, (state) => {
      //   state.loading = 'failed';
      // })
      // .addCase(FetchCargoIdsWithOrderId.fulfilled, (state, action) => {
      //   state.cargos = action.payload;
      //   state.loading = 'succeeded';
      // })
      //Fetch cargos by order ids
      .addCase(FetchCargoByOrderIds.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(FetchCargoByOrderIds.rejected, (state) => {
        state.loading = 'failed';
      })
      .addCase(FetchCargoByOrderIds.fulfilled, (state, action) => {
        state.cargos = action.payload;
        state.loading = 'succeeded';
      })
  },
});

export const {} = cargoSlice.actions;

export const SelectCargoState = (state: RootState) => state.cargosGlobal;

export default cargoSlice.reducer;
