import React, { useEffect, useState } from "react";
import Comments from "@features/blog/blog-comments";

import { BlogPostComment } from "@features/blog/blog-slice";

import "@features/blog/blog-posts.sass";
import { useSelector } from "react-redux";
import { RootState } from "@app/store";

type Props = {
  post: BlogPostComment;
};

const BlogPosts: React.FC<Props> = ({ post }) => {
  const [expandCommentRefiner, setExpandCommentRefiner] = useState(false);
  const pageIndex = useSelector((state: RootState) => state.posts.paginationIndex);

  const handleToggleCommentPanel = () => {
    setExpandCommentRefiner(!expandCommentRefiner);
  };

  useEffect(() => {
    // Collapse Comments When Moving To Next/Previous Page
    setExpandCommentRefiner(false);
  }, [pageIndex]);

  return (
    <div id="posts" className="space-items-small">
      <div className="panel post" data-testid="blog-post">
        <h2 className="post__title">{post.title}</h2>
        <div className="post__body">{post.body}</div>
      </div>
      <div className="comment-refiner">
        <div
          className={`comment-refiner__content ${
            expandCommentRefiner
              ? "comment-refiner__content--expand"
              : "comment-refiner__content--collapse"
          }`}
        >
          <div
            className={`content-area  ${
              expandCommentRefiner ? "content-area--expand" : "content-area--collapse"
            }`}
          >
            {post.comments?.map((comment, index) => {
              return (
                <div
                  key={`${comment.name}-${index}`}
                  className={`${
                    expandCommentRefiner
                      ? "comment-refiner__list--expand"
                      : "comment-refiner__list--collapse"
                  }`}
                  data-testid="blog-comments"
                >
                  <Comments comment={comment} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div
        className="view-comments-button"
        onClick={handleToggleCommentPanel}
        data-testid="view-comments-button"
      >
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
