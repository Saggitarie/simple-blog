import Blog from "@features/blog/blog-posts";
import BlogSearch from "@features/blog/blog-search";

import { RootState } from "@app/store";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { fetchBlogPosts, fetchBlogComments } from "@features/blog/blog-slice";

import { incrementPaginationIndex, decrementPaginationIndex } from "@features/blog/blog-slice";

const Home: React.FC = () => {
  const posts = useSelector((state: RootState) => state.posts.renderBlogData);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBlogPosts());
    dispatch(fetchBlogComments());
  }, [dispatch]);

  const handlePagination = (direction: string) => {
    if (direction === "next") dispatch(incrementPaginationIndex());
    else dispatch(decrementPaginationIndex());
  };

  return (
    <div className="container space-items-medium">
      <h1 className="center">Simple Blog Post Page</h1>
      <BlogSearch />
      {posts.flat().length !== 0 ? (
        posts.flat().map((post, index) => {
          return (
            <div key={index}>
              <strong>POST TITLE: {post.title}</strong>
              <div>POST BODY: {post.body}</div>
              {post.comments?.map((el) => {
                return (
                  <div key={el.id}>
                    <div>{el.id}</div>
                    <div>{el.postId}</div>
                    <div>{el.email}</div>
                  </div>
                );
              })}
            </div>
          );
        })
      ) : (
        <div>No Result</div>
      )}
      <button onClick={() => handlePagination("prev")}>Prev</button>
      <button onClick={() => handlePagination("next")}>Next</button>
    </div>
  );
};

export default Home;
