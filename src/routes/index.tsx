import { RootState, useAppDispatch } from "@app/store";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import Post from "@features/blog/blog-posts";
import BlogSearch from "@features/blog/blog-search";

import {
  fetchBlogPosts,
  fetchBlogComments,
  formatBlogPostsForRender,
} from "@features/blog/blog-slice";

import { incrementPaginationIndex, decrementPaginationIndex } from "@features/blog/blog-slice";

import "@routes/home.sass";

const Home: React.FC = () => {
  const posts = useSelector((state: RootState) => state.posts.renderBlogData);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const initialFetch = async () => {
      await dispatch(fetchBlogPosts());
      await dispatch(fetchBlogComments());

      dispatch(formatBlogPostsForRender());
    };
    initialFetch();
  }, [dispatch]);

  const handlePagination = (direction: string) => {
    if (direction === "next") dispatch(incrementPaginationIndex());
    else dispatch(decrementPaginationIndex());
  };

  return (
    <div className="home">
      <div className="container space-items-medium">
        <h2 className="center">Simple Blog Post Page</h2>
        <div className="flex-end">
          <BlogSearch />
        </div>
        {posts.flat().length !== 0 ? (
          posts.flat().map((post, index) => {
            return (
              <div key={index}>
                <Post post={post} />
              </div>
            );
          })
        ) : (
          <div>No Result</div>
        )}
        <div className="pagination-button">
          <div className="flex-space-between">
            <button onClick={() => handlePagination("prev")}>Prev</button>
            <button onClick={() => handlePagination("next")}>Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
