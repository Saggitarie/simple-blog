import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { includes, chunk } from "lodash";

import { getPosts, getComments } from "@features/blog/blog-api";

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
  isLoading: boolean;
  paginationIndex: number;
  paginationEndIndex: number;
  postsData: BlogPost[];
  commentsData: BlogComment[];
  blogData: BlogPostComment[];
  filterBlogData: BlogPostComment[][];
  renderBlogData: BlogPostComment[];
}

const initialState: BlogState = {
  isLoading: true,
  paginationIndex: 0,
  paginationEndIndex: 0,
  postsData: [],
  commentsData: [],
  blogData: [],
  filterBlogData: [],
  renderBlogData: [],
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
  name: "posts",
  initialState,
  reducers: {
    formatBlogPostsForRender: (state) => {
      state.commentsData.forEach((comment) => {
        const postId = comment.postId - 1;

        if (!state.blogData[postId].comments) {
          state.blogData[postId].comments = [];
          state.blogData[postId].comments?.push(comment);
        } else state.blogData[postId].comments?.push(comment);
      });
    },
    searchBlogPosts: (state, action: PayloadAction<string>) => {
      const filterData = state.blogData.filter(
        (blog) => includes(blog.title, action.payload) || includes(blog.body, action.payload)
      );

      state.paginationIndex = 0;
      state.paginationEndIndex = 0;
      state.renderBlogData = [];

      if (filterData.length > 0) {
        state.filterBlogData = chunk(filterData, 5);
        state.paginationEndIndex = state.filterBlogData.length - 1;
        state.renderBlogData = state.filterBlogData[state.paginationIndex];
      }

      state.isLoading = false;
    },
    setIsLoadingState: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    incrementPaginationIndex: (state) => {
      if (state.paginationIndex < state.paginationEndIndex) state.paginationIndex++;
      state.renderBlogData = state.filterBlogData[state.paginationIndex];
    },
    decrementPaginationIndex: (state) => {
      if (state.paginationIndex > 0) state.paginationIndex--;
      state.renderBlogData = state.filterBlogData[state.paginationIndex];
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
      });
  },
});

export const {
  formatBlogPostsForRender,
  searchBlogPosts,
  setIsLoadingState,
  incrementPaginationIndex,
  decrementPaginationIndex,
} = postsSlice.actions;

export default postsSlice.reducer;
