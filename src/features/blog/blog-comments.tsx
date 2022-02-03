import { BlogComment } from "@features/blog/blog-slice";

import { ReactComponent as AnonymousUser } from "@assets/images/user.svg";

import "@features/blog/blog-comments.sass";

type Props = {
  comment: BlogComment;
};

const BlogPosts: React.FC<Props> = ({ comment }) => {
  return (
    <div id="comment">
      <div className="comment space-items-big">
        <div className="comment__icon">
          <AnonymousUser className="comment__icon__user" />
        </div>
        <div className="comment__content">
          <strong>{comment.email}</strong>
          <div>{comment.body}</div>
        </div>
      </div>
    </div>
  );
};

export default BlogPosts;
