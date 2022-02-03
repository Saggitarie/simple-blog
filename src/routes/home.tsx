import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { BallTriangle } from "react-loader-spinner";

import { RootState, useAppDispatch } from "@app/store";

import Post from "@features/blog/blog-posts";
import BlogSearch from "@features/blog/blog-search";

import {
  fetchBlogPosts,
  fetchBlogComments,
  formatBlogPostsForRender,
  incrementPaginationIndex,
  decrementPaginationIndex,
} from "@features/blog/blog-slice";

import "@routes/home.sass";
import Button from "@components/button";

const Home: React.FC = () => {
  const posts = useSelector((state: RootState) => state.posts.renderBlogData);
  const isLoading = useSelector((state: RootState) => state.posts.isLoading);
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

    window.scrollTo(0, 0);
  };

  return (
    <div id="home">
      <div className="container space-items-medium">
        <h2 className="center">Assignment</h2>
        <div className="flex-end">
          <BlogSearch />
        </div>
        {isLoading ? (
          <div className="loading-animation">
            <BallTriangle />
          </div>
        ) : (
          <div>
            {posts.length !== 0 ? (
              posts.map((post, index) => {
                return (
                  <div key={`blogposts-${index}`}>
                    <Post post={post} />
                  </div>
                );
              })
            ) : (
              <div>No Result</div>
            )}
            <div className="pagination-button flex-space-between">
              <Button direction="prev" handleEvent={handlePagination}>
                <span>Prev</span>
              </Button>
              <Button direction="next" handleEvent={handlePagination}>
                <span>Next</span>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
