import { configureStore } from "@reduxjs/toolkit";

import trucksReducer from "./pages/trucks/slices/TruckSlice";
import truckListReducer from "./pages/trucks/slices/TruckListSlice";
import goodsReducer from "./pages/goods/slices/GoodsSlice";
import goodsListReducer from "./pages/goods/slices/GoodsListSlice";

export const store = configureStore({
  reducer: {
    trucksGlobal: trucksReducer,
    truckListGlobal: truckListReducer,
    goodsGlobal: goodsReducer,
    goodsListGlobal: goodsListReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
