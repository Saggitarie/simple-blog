import React, { useState, useEffect, useRef, ChangeEvent } from "react";

import "@features/blog/blog-search.sass";
import { useDispatch } from "react-redux";

import { searchBlogPosts } from "@features/blog/blog-slice";

import "@features/blog/blog-search.sass";
import { debounce } from "lodash";

const BlogPosts: React.FC = () => {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  const debouncedSearch = useRef(debounce((text: string) => dispatch(searchBlogPosts(text)), 1000));

  useEffect(() => {
    debouncedSearch.current(input);
  }, [input]);

  const handleUserInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };
  return (
    <div id="search">
      <input onChange={handleUserInput} type="text" placeholder="Search" className="user-input" />
    </div>
  );
};

export default BlogPosts;
