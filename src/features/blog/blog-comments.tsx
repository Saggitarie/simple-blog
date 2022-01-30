import "@features/blog/blog-posts.sass";

import { BlogComment } from "@features/blog/blog-slice";

type Props = {
  comment: BlogComment;
};

const BlogPosts: React.FC<Props> = ({ comment }) => {
  return (
    <div id="comment">
      <div>Comment User Name: {comment.name}</div>
      <div>Comment User Email: {comment.email}</div>
      <div>{comment.body}</div>
    </div>
  );
};

export default BlogPosts;
