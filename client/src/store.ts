import { configureStore } from "@reduxjs/toolkit";

import trucksReducer from "./pages/truckSlice";
import truckListReducer from "./pages/truckListSlice";

export const store = configureStore({
  reducer: {
    trucksGlobal: trucksReducer,
    truckListGlobal: truckListReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
