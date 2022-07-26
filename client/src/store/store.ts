import { configureStore } from '@reduxjs/toolkit';

import trucksReducer from './slices/truck/TruckSlice';
import truckListReducer from './slices/truck/TruckListSlice';
import orderReducer from './slices/order/OrderSlice';
import orderListReducer from './slices/order/OrderListSlice';
// import orderMultiSelectReducer from "./slices/order/OrderMultiSelectSlice";
import cargoReducer from './slices/cargo/CargoSlice';
import cargoListReducer from './slices/cargo/CargoListSlice';
import summaryReducer from './slices/summaryTree/summaryTreeSlice';
import routeReducer from '../pages/route/slices/RouteSlice';
import loadAnalyzerReducer from '../pages/loadFactor/slice/LoadAnalyzerSlice';

export const store = configureStore({
  reducer: {
    trucksGlobal: trucksReducer,
    truckListGlobal: truckListReducer,
    ordersGlobal: orderReducer,
    orderListGlobal: orderListReducer,
    // orderMultiSelectGlobal: orderMultiSelectReducer,
    cargosGlobal: cargoReducer,
    cargoListGlobal: cargoListReducer,
    summaryGlobal: summaryReducer,
    routesGlobal: routeReducer,
    loadAnalyzerGlobal: loadAnalyzerReducer,
    
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
