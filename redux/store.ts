import { configureStore } from "@reduxjs/toolkit";
import customerReducer from "./slices/customerSlice"
import productReducer from "./slices/productSlice";
import filterReducer from "./slices/filterSlice";

export const store = configureStore({
  reducer: {
    customer: customerReducer,
    product: productReducer,
    filter: filterReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
