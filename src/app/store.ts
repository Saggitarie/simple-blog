import { configureStore } from "@reduxjs/toolkit";

import postsReducer from "@features/blog/blog-slice";
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: { posts: postsReducer },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
// Export a hook that can be reused to resolve types
export const useAppDispatch = () => useDispatch<AppDispatch>();
