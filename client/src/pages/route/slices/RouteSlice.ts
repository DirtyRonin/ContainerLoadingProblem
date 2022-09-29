import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RouteApi } from '../../../apis/routeApi';
import { TruckLoadingApi } from '../../../apis/truckLoadingsApi';
import { IPopulatedTruckLoading, IRoute, ITruckLoading } from '../../../interfaces';
import { IAsyncRequest, initialAsyncRequest } from '../../../interfaces/IAsyncRequest';
import { RootState } from '../../../store';

interface state {
  selectedTruckLoadingId: string;
  selectedRouteId: string;
  routes: IAsyncRequest<IRoute[]>;
  truckLoadings:IAsyncRequest<IPopulatedTruckLoading[]>;
}

const initialState: state = {
  selectedTruckLoadingId: '',
  selectedRouteId: '',
  routes: initialAsyncRequest([]),
  truckLoadings:initialAsyncRequest([])
};

export const FetchAllRoutes = createAsyncThunk('routes/fetchAllStatus', async () => await RouteApi.FetchRoutes());
export const DeleteRoute = createAsyncThunk('routes/RemoveStatus', async (id: string, thunkAPI) => await RouteApi.DeleteRoute(id));
export const UpdateRoute = createAsyncThunk('routes/UpdateStatus', async (route: IRoute, thunkAPI) => await RouteApi.UpdateRoute(route));
export const CreateRoute = createAsyncThunk('routes/CreateStatus', async (route: IRoute, thunkAPI) => await RouteApi.CreateRoute(route));

export const FetchAllTruckLoadings = createAsyncThunk('truckLoadings/fetchAllStatus', async () => await TruckLoadingApi.FetchTruckLoadings());
// export const DeleteRoute = createAsyncThunk('routes/RemoveStatus', async (id: string, thunkAPI) => await RouteApi.DeleteRoute(id));
// export const UpdateRoute = createAsyncThunk('routes/UpdateStatus', async (route: IRoute, thunkAPI) => await RouteApi.UpdateRoute(route));
// export const CreateRoute = createAsyncThunk('routes/CreateStatus', async (route: IRoute, thunkAPI) => await RouteApi.CreateRoute(route));

export const FetchTruckLoadingByRouteId = createAsyncThunk('routes/filterTruckLoadingByRouteId', async (routeId: string) => {
  return await TruckLoadingApi.FilterTruckLoadingByRouteId(routeId);
});


export const routeSlice = createSlice({
  name: 'truckLoadings',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    SelectRouteId: (state, action: PayloadAction<string>) => {
      state.selectedRouteId = action.payload;
    },
    UnselectRouteId: (state) => {
      state.selectedRouteId = '';
    },
    SelectTruckLoadingId: (state, action: PayloadAction<string>) => {
      state.selectedTruckLoadingId = action.payload;
    },
    UnselectTruckLoadingId: (state) => {
      state.selectedTruckLoadingId = '';
    },
    ClearRoutes: (state) => {
      state.routes.value = [];
    },
  },
  extraReducers(builder) {
    builder
      //Fetch all
      .addCase(FetchAllRoutes.pending, (state) => {
        state.routes.status = 'pending';
        state.routes.error = '';
      })
      .addCase(FetchAllRoutes.rejected, (state, action) => {
        state.routes.status = 'failed';
        state.routes.error = JSON.stringify(action);
      })
      .addCase(FetchAllRoutes.fulfilled, (state, action) => {
        state.routes.value = action.payload;
        state.routes.status = 'succeeded';
      })
      //Remove
      .addCase(DeleteRoute.pending, (state) => {
        state.routes.status = 'pending';
        state.routes.error = '';
      })
      .addCase(DeleteRoute.rejected, (state, action) => {
        state.routes.status = 'failed';
        state.routes.error = JSON.stringify(action);
      })
      .addCase(DeleteRoute.fulfilled, (state, action) => {
        const index = state.routes.value.findIndex((x) => x._id === action.payload);
        state.routes.value.splice(index, 1);

        state.routes.status = 'succeeded';
      })
      // Update
      .addCase(UpdateRoute.pending, (state) => {
        state.routes.status = 'pending';
        state.routes.error = '';
      })
      .addCase(UpdateRoute.rejected, (state, action) => {
        state.routes.status = 'failed';
        state.routes.error = JSON.stringify(action);
      })
      .addCase(UpdateRoute.fulfilled, (state, action) => {
        const index = state.routes.value.findIndex((x) => x._id === action.payload._id);
        state.routes.value[index] = action.payload;
        state.routes.status = 'succeeded';
      })
      // Create
      .addCase(CreateRoute.pending, (state) => {
        state.routes.status = 'pending';
        state.routes.error = '';
      })
      .addCase(CreateRoute.rejected, (state, action) => {
        state.routes.status = 'failed';
        state.routes.error = JSON.stringify(action);
      })
      .addCase(CreateRoute.fulfilled, (state, action) => {
        state.routes.value.push(action.payload);
        state.routes.status = 'succeeded';
      })//Filter Truckloadings by route id
      .addCase(FetchTruckLoadingByRouteId.pending, (state) => {
        state.routes.status = 'pending';
        state.routes.error = '';
      })
      .addCase(FetchTruckLoadingByRouteId.rejected, (state, action) => {
        state.routes.status = 'failed';
        state.routes.error = JSON.stringify(action);
      })
      .addCase(FetchTruckLoadingByRouteId.fulfilled, (state, action) => {
        state.truckLoadings.value = action.payload;
        state.routes.status = 'succeeded';
      })

      
  },
});

export const { SelectRouteId, UnselectRouteId, SelectTruckLoadingId, UnselectTruckLoadingId,ClearRoutes } = routeSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const SelectRouteState = (state: RootState) => state.routesGlobal;

export default routeSlice.reducer;
