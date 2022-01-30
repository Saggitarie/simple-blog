import React, { useState, useEffect } from "react";

import "@features/blog/blog-search.sass";
import { useDispatch } from "react-redux";

import { searchBlogPosts } from "@features/blog/blog-slice";

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
    <div className="test">
      <input onChange={handleUserInput} type="text" placeholder="Search" />
    </div>
  );
};

export default BlogPosts;
