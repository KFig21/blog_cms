import React, { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import "./DeleteModal.scss";

export default function DeleteModal({ post, handleCancelPost, deletePost }) {
  const { user } = useContext(AuthContext);

  return (
    <div className="shade">
      <div className="delete-modal-container">
        <h2 className="delete-modal-header">
          Are you sure you want to delete this Post
        </h2>
        <span className="post-title">{post.title}</span>
        <span className="post-author">{post.author}</span>
        <span className="post-date">Submitted: {post.submitted}</span>

        {!user.isAdmin && (
          <div className="test-account-message">
            USER DOES NOT HAVE ADMIN PRIVILEGES TO DELETE POST
          </div>
        )}
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
