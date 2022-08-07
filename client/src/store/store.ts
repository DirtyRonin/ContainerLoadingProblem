import { configureStore } from "@reduxjs/toolkit";

import trucksReducer from "./slices/truck/TruckSlice";
import truckListReducer from "./slices/truck/TruckListSlice";
import goodsReducer from "./slices/goods/GoodsSlice";
import goodsListReducer from "./slices/goods/GoodsListSlice";
import orderReducer from "./slices/order/OrderSlice";
import orderListReducer from "./slices/order/OrderListSlice";
import cargoReducer from "./slices/cargo/CargoSlice";
import cargoListReducer from "./slices/cargo/CargoListSlice";

export const store = configureStore({
  reducer: {
    trucksGlobal: trucksReducer,
    truckListGlobal: truckListReducer,
    goodsGlobal: goodsReducer,
    goodsListGlobal: goodsListReducer,
    ordersGlobal: orderReducer,
    orderListGlobal: orderListReducer,
    cargosGlobal: cargoReducer,
    cargoListGlobal: cargoListReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
