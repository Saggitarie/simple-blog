import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { getPosts } from "@features/posts/postsAPI";

export interface BlogPost {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface BlogPostsState {
  postsData: BlogPost[];
}

const initialState: BlogPostsState = {
  postsData: [],
};

export const fetchBlogPosts = createAsyncThunk<Array<BlogPost>, undefined>(
  "posts/fetchAllPosts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getPosts();

      return response;
    } catch (error) {
      let message = "Unknown Error";

      if (error instanceof Error) message = error.message;
      return rejectWithValue(message);
    }
  }
);

const postsSlice = createSlice({
  name: "blogposts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBlogPosts.fulfilled, (state, action) => {
      state.postsData = action.payload;
    });
  },
});

export default postsSlice.reducer;
