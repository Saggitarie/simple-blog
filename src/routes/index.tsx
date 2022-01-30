import Blog from "@features/blog/blog-posts";
import BlogSearch from "@features/blog/blog-search";

import { RootState } from "@app/store";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { fetchBlogPosts, fetchBlogComments } from "@features/blog/blog-slice";

const Home: React.FC = () => {
  const posts = useSelector((state: RootState) => state.posts.filterBlogData);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBlogPosts());
    dispatch(fetchBlogComments());
  }, [dispatch]);

  return (
    <div className="container space-items-medium">
      <h1 className="center">Simple Blog Post Page</h1>
      <BlogSearch />
      {posts.map((post) => {
        return (
          <div key={post.id}>
            <strong>POST TITLE: {post.title}</strong>
            <div>POST BODY: {post.body}</div>
            {/* {post.comments?.map((el) => {
              return (
                <div key={el.id}>
                  <div>{el.id}</div>
                  <div>{el.postId}</div>
                  <div>{el.email}</div>
                </div>
              );
            })} */}
          </div>
        );
      })}
      <button>test</button>
      <Blog />
    </div>
  );
};

export default Home;
