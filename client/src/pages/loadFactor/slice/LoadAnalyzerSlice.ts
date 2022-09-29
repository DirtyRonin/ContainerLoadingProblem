import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WritableDraft } from 'immer/dist/types/types-external';
import { TruckLoadingApi } from '../../../apis/truckLoadingsApi';
import { ICargo, ILoadAnalyzer, ITruck, ITruckLoading, ToLoadSummaryIds } from '../../../interfaces';

import { IAsyncRequest, initialAsyncRequest } from '../../../interfaces/IAsyncRequest';
import { ILoadSummaryIds } from '../../../interfaces/ILoadSummaryIds';
import { myContainer } from '../../../inversify.config';
import { KeyValueLoadSummary, AsyncStatus } from '../../../models';
import { RootState } from '../../../store';
import { IsStringEmpty } from '../../../utils/shared';
import { TYPES } from '../../../utils/shared/registerSymbols';

export type state = {
  readonly selectedTruckIds: string[];
  readonly selectedOrderIds: string[];
  readonly selectedRouteId: string;
  /** fetched truckloading will be converted to ILoadSummaryIds*/
  readonly selectedLoadSummaryIds: ILoadSummaryIds[];
  /** save the fetched truckloading a second time as ILoadSummaryIds for creating a delta  */
  readonly unchangedLoadSummaryIdsFromCloud: ILoadSummaryIds[];
  readonly loadSummaries: IAsyncRequest<KeyValueLoadSummary[]>;
  readonly SaveCurrentTruckLoadingsStatus: IAsyncRequest<ILoadSummaryIds[]>
};

const initialState: state = {
  selectedTruckIds: [],
  selectedOrderIds: [],
  selectedRouteId: '',
  selectedLoadSummaryIds: [],
  unchangedLoadSummaryIdsFromCloud: [],
  loadSummaries: initialAsyncRequest<KeyValueLoadSummary[]>([]),
  SaveCurrentTruckLoadingsStatus:initialAsyncRequest<ILoadSummaryIds[]>([])
};

const loadAnalyzer = myContainer.get<ILoadAnalyzer>(TYPES.LoadAnalyzer);

export const AnalyzeLoadingForSummaries = createAsyncThunk(
  'loadAnalyzer/analyzeLoadingForSummaries',
  async ({ cargos, trucks, selectedLoadSummaryIds }: { cargos: ICargo[]; trucks: ITruck[]; selectedLoadSummaryIds: ILoadSummaryIds[] }) => {
    return await loadAnalyzer.AnalyzeLoadingForSummaries(cargos, trucks, selectedLoadSummaryIds);
  }
);

type SaveCurrentTruckLoadingsType = { adding: ITruckLoading[]; removing: string[] };

export const SaveCurrentTruckLoadings = createAsyncThunk(
  'truckloading/saveCurrentSelection',
  async ({ adding, removing }: SaveCurrentTruckLoadingsType, { getState }) => {
    const api = TruckLoadingApi;

    const forAdding = adding.map((_) => api.CreateTruckLoading(_));
    const forRemoving = removing.map((_) => api.DeleteTruckLoading(_));

    const results = await Promise.all([Promise.all(forRemoving), Promise.all(forAdding)]);
    const removalIds: string[] = results[0];
    const createtruckLoadings: ITruckLoading[] = results[1];

    const state: state = getState() as state;
    const currentSelectedLoadSummaryIds = [...state.selectedLoadSummaryIds];

    /** remove every entry with an empty _id  */
    const clearedFromSummaryIdsWithoutValid_Id = currentSelectedLoadSummaryIds.filter((_) => !IsStringEmpty(_._id));

    /** convert and add all new truck loadings*/
    const loadSummaryIdsWithValid_Id = createtruckLoadings.map((_) => ToLoadSummaryIds(_)) ;

    return [...clearedFromSummaryIdsWithoutValid_Id,...loadSummaryIdsWithValid_Id]
  }
);

export const loadAnalyzerSlice = createSlice({
  name: 'loadAnalyzer',
  initialState,
  reducers: {
    addTruckId(state, action: PayloadAction<string>) {
      console.log(`adding truck id on an selected truck`);
      state.selectedTruckIds.push(action.payload);
    },
    removeTruckId(state, action: PayloadAction<string>) {
      console.log(`removing truck id on an selected truck`);
      const index = state.selectedTruckIds.indexOf(action.payload);
      state.selectedTruckIds.splice(index, 1);
    },
    addOrderId(state, action: PayloadAction<string>) {
      console.log(`adding order id on an selected order`);
      state.selectedOrderIds.push(action.payload);
    },
    removeOrderId(state, action: PayloadAction<string>) {
      console.log(`removing order id on an selected order`);
      const index = state.selectedOrderIds.indexOf(action.payload);
      state.selectedOrderIds.splice(index, 1);
    },
    addRouteId(state, action: PayloadAction<string>) {
      console.log(`adding route id on an selected route`);
      state.selectedRouteId = action.payload;
    },
    removeRouteId(state, action: PayloadAction<string>) {
      console.log(`removing route id on an selected route`);
      state.selectedRouteId = '';
    },
    addSelectedLoadSummaryIds(state, action: PayloadAction<ILoadSummaryIds>) {
      console.log(`adding a selected load summary`);
      state.selectedLoadSummaryIds.push(action.payload);
    },
    removeSelectedLoadSummaryIds(state, action: PayloadAction<ILoadSummaryIds>) {
      console.log(`removing a selected load summary `);

      const index = state.selectedLoadSummaryIds.findIndex(
        (x) => x.cargoId === action.payload.cargoId && x.orderId === action.payload.orderId && x.truckId === action.payload.truckId
      );
      if (index === -1) return;

      state.selectedLoadSummaryIds.splice(index, 1);
    },
    setSelectedLoadSummaryIds(state, action: PayloadAction<ILoadSummaryIds[]>) {
      console.log(`setting a existing set of selected load summaries ids`);
      state.selectedLoadSummaryIds = action.payload;
      state.unchangedLoadSummaryIdsFromCloud = action.payload;

      state.selectedOrderIds = action.payload.map((_) => _.orderId);
      state.selectedTruckIds = action.payload.map((_) => _.truckId);
    },
    clearSelectedLoadSummaryIds(state) {
      console.log(`clear selected load summaries ids`);
      state.selectedLoadSummaryIds = [];
      state.unchangedLoadSummaryIdsFromCloud = [];

      state.selectedOrderIds = [];
      state.selectedTruckIds = [];
    },
  },
  extraReducers(builder) {
    builder
      .addCase(AnalyzeLoadingForSummaries.pending, (state) => {
        console.log(`Fetching all load summaries in summary tree for analyzer started`);
        state.loadSummaries.status = 'pending';
        state.loadSummaries.error = '';
      })
      .addCase(AnalyzeLoadingForSummaries.rejected, (state, e) => {
        console.log(`Fetching all load summaries in summary tree for analyzer failed`);
        state.loadSummaries.status = 'failed';
        state.loadSummaries.error = e.error.message ?? '';
      })
      .addCase(AnalyzeLoadingForSummaries.fulfilled, (state, action) => {
        console.log(`Fetching all load summaries in summary tree for analyzer succeeded`);
        state.loadSummaries.value = action.payload;
        state.loadSummaries.status = 'succeeded';
      })

      // SaveCurrentTruckLoadings
      .addCase(SaveCurrentTruckLoadings.pending, (state) => {
        console.log(`Save current selection as truckLoadings`);
        state.SaveCurrentTruckLoadingsStatus.status = 'pending';
        state.SaveCurrentTruckLoadingsStatus.error = '';
      })
      .addCase(SaveCurrentTruckLoadings.rejected, (state, e) => {
        console.log(`Save current selection as truckLoadings failed`);
        state.SaveCurrentTruckLoadingsStatus.status = 'failed';
        state.SaveCurrentTruckLoadingsStatus.error = e.error.message ?? '';
      })
      .addCase(SaveCurrentTruckLoadings.fulfilled, (state, action) => {
        console.log(`Save current selection as truckLoadings succeeded`);


        state.selectedLoadSummaryIds = action.payload;
        state.unchangedLoadSummaryIdsFromCloud = action.payload;
  
        state.selectedOrderIds = action.payload.map((_) => _.orderId);
        state.selectedTruckIds = action.payload.map((_) => _.truckId);


        state.SaveCurrentTruckLoadingsStatus.status = 'succeeded';
      });
  },
});

export const {
  addTruckId,
  removeTruckId,
  addOrderId,
  removeOrderId,
  addRouteId,
  removeRouteId,
  addSelectedLoadSummaryIds,
  removeSelectedLoadSummaryIds,
  setSelectedLoadSummaryIds,
  clearSelectedLoadSummaryIds,
} = loadAnalyzerSlice.actions;
export const SelectLoadAnalyzerState = (state: RootState) => state.loadAnalyzerGlobal;

export default loadAnalyzerSlice.reducer;
