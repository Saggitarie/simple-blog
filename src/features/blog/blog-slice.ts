import { createAsyncThunk, createSlice, PayloadAction, current } from "@reduxjs/toolkit";

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
  paginationIndex: 0;
  postsData: BlogPost[];
  commentsData: BlogComment[];
  blogData: BlogPostComment[];
  filterBlogData: BlogPostComment[];
  renderBlogData: BlogPostComment[];
}

const initialState: BlogState = {
  paginationIndex: 0,
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
  name: "blog",
  initialState,
  reducers: {
    formatBlogPostsForRender: (state) => {
      state.commentsData.forEach((el) => {
        const postId = el.postId - 1;

        if (!state.blogData[postId] && !state.blogData[postId].comments) {
          state.blogData[postId].comments = [];
          state.blogData[postId].comments?.push(el);
        } else state.blogData[postId].comments?.push(el);
      });
    },
    searchBlogPosts: (state, action: PayloadAction<string>) => {
      const filterData = state.blogData.filter(
        (blog) => includes(blog.title, action.payload) || includes(blog.body, action.payload)
      );

      state.renderBlogData.splice(0);

      if (filterData.length > 0) {
        state.filterBlogData = chunk(filterData, 5);
        state.renderBlogData.splice(0, 0, state.filterBlogData[state.paginationIndex]);
      }
    },
    incrementPaginationIndex: (state) => {
      if (state.paginationIndex < state.filterBlogData.length / 2) state.paginationIndex++;

      state.renderBlogData.splice(0);
      state.renderBlogData.splice(0, 0, state.filterBlogData[state.paginationIndex]);
    },
    decrementPaginationIndex: (state) => {
      if (state.paginationIndex > 0) state.paginationIndex--;

      state.renderBlogData.splice(0);
      state.renderBlogData.splice(0, 0, state.filterBlogData[state.paginationIndex]);
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

export const {
  formatBlogPostsForRender,
  searchBlogPosts,
  incrementPaginationIndex,
  decrementPaginationIndex,
} = postsSlice.actions;

export default postsSlice.reducer;
