import React, { useState } from "react";
import Comments from "@features/blog/blog-comments";

import { BlogPostComment } from "@features/blog/blog-slice";

import "@features/blog/blog-posts.sass";

type Props = {
  post: BlogPostComment;
};

const BlogPosts: React.FC<Props> = ({ post }) => {
  const [expandCommentRefiner, setExpandCommentRefiner] = useState(false);

  const handleToggleCommentPanel = () => {
    setExpandCommentRefiner(!expandCommentRefiner);
  };

  return (
    <div id="posts" className="space-items-small">
      <div className="panel">
        <h2 className="post-title">{post.title}</h2>
        <div className="post-body">{post.body}</div>
      </div>
      <div className="comment-refiner">
        <div
          className={`comment-refiner-content ${
            expandCommentRefiner ? "comment-content-area-expand" : "comment-content-area-collapse"
          }`}
        >
          <div
            className={`content-area  ${
              expandCommentRefiner ? "content-area-expand" : "content-area-collapse"
            }`}
          >
            {post.comments?.map((comment) => {
              return (
                <div
                  key={comment.id}
                  className={`${
                    expandCommentRefiner ? "comment-list-expand" : "comment-list-collapse"
                  }`}
                >
                  <Comments comment={comment} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="view-comment-button" onClick={handleToggleCommentPanel}>
        {expandCommentRefiner ? (
          <p>Close Comments</p>
        ) : (
          <p>View Comments ({post.comments?.length})</p>
        )}
      </div>
    </div>
  );
};

export default BlogPosts;
