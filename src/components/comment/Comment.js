import React from "react";
import "./Comment.scss";

export default function Comment({ comment, handleDeleteComment }) {
  return (
    <div className="comment-container" key={comment._id}>
      <span className="comment-name">{comment.user}</span>
      <span className="comment-text">{comment.text}</span>
      <span className="comment-date">Submitted: {comment.submitted}</span>
      <button
        className="comment-delete-button"
        onClick={() => handleDeleteComment(comment)}
      >
        Delete
      </button>
    </div>
  );
}
