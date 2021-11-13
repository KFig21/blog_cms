import React from "react";
import "./DeleteModal.scss";

export default function DeleteModal({ post, handleCancelPost, deletePost }) {
  return (
    <div className="shade">
      <div className="delete-modal-container">
        <h2 className="delete-modal-header">
          Are you sure you want to delete this Post
        </h2>
        <span className="post-title">{post.title}</span>
        <span className="post-author">{post.author}</span>
        <span className="post-date">Submitted: {post.submitted}</span>
        <div className="buttons-container">
          <button className="delete-button" onClick={() => deletePost()}>
            Delete
          </button>
          <button className="cancel-button" onClick={() => handleCancelPost()}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
