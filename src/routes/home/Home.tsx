import Blog from "@features/posts/BlogPosts";

import { RootState } from "@app/store";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { fetchBlogPosts } from "@features/posts/postsSlice";

const Home: React.FC = () => {
  const posts = useSelector((state: RootState) => state.posts.postsData);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBlogPosts());
  }, []);

  return (
    <div className="container center space-items-medium">
      <h1>Simple Blog Post Page</h1>
      <span>test</span>
      <span>test</span>
      <span>test</span>
      <span>test</span>
      <Blog />
    </div>
  );
};

export default Home;
