import React from "react";
import { Link } from "react-router-dom";
import "./Post.scss";
import { Comment } from "@material-ui/icons";

export default function Post({ post }) {
  let commentCount = post.comments.length;
  return (
    <div className="post-container">
      <span className="post-container-title">{post.title}</span>
      <span className="post-container-description">{post.description}</span>
      <span className="post-container-author">By: {post.author} </span>
      <span className="post-container-submitted">{post.submitted} </span>
      <div className="edit-post-container">
        <Link to={`/posts/${post._id}`}>
          <button>Edit Post</button>
        </Link>
        <div
          style={{
            color:
              commentCount > 0 ? "rgb(100, 100, 100)" : "rgb(195, 195, 195)",
          }}
          className="comment-count-container"
        >
          <div className="comment-icon-container">
            <Comment />
          </div>
          <span className="comment-count">{commentCount}</span>
        </div>
      </div>
    </div>
  );
}
