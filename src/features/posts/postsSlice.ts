import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { getPosts, getComments } from "@features/posts/postsAPI";

export interface BlogPost {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface BlogComment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

export interface BlogPostComment {
  userId: number;
  id: number;
  title: string;
  body: string;
  comments?: BlogComment[];
}

export interface BlogState {
  postsData: BlogPost[];
  commentsData: BlogComment[];
  blogData: BlogPostComment[];
}

const initialState: BlogState = {
  postsData: [],
  commentsData: [],
  blogData: [],
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

export const fetchBlogComments = createAsyncThunk<Array<BlogComment>, undefined>(
  "posts/fetchAllComments",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getComments();

      return response;
    } catch (error) {
      let message = "Unknown Error";

      if (error instanceof Error) message = error.message;
      return rejectWithValue(message);
    }
  }
);

const postsSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    formatBlogPostsForRender: (state) => {
      state.commentsData.forEach((el) => {
        const postId = el.postId - 1;

        if (!state.blogData[postId].comments) {
          state.blogData[postId].comments = [];
          state.blogData[postId].comments?.push(el);
        } else state.blogData[postId].comments?.push(el);
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogPosts.fulfilled, (state, action) => {
        state.postsData = action.payload;
        state.blogData = action.payload;
      })
      .addCase(fetchBlogComments.fulfilled, (state, action) => {
        state.commentsData = action.payload;
        postsSlice.caseReducers.formatBlogPostsForRender(state);
      });
  },
});

export const { formatBlogPostsForRender } = postsSlice.actions;

export default postsSlice.reducer;
