import React, { useState, useEffect } from "react";

import "@features/blog/blog-search.sass";
import { useDispatch } from "react-redux";

import { searchBlogPosts } from "@features/blog/blog-slice";

import "@features/blog/blog-search.sass";

const BlogPosts: React.FC = () => {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(searchBlogPosts(input));
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [dispatch, input]);

  const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };
  return (
    <div id="search">
      <input onChange={handleUserInput} type="text" placeholder="Search" className="user-input" />
    </div>
  );
};

export default BlogPosts;
