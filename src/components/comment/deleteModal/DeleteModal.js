import React from "react";
import "./DeleteModal.scss";

export default function DeleteModal({
  comment,
  handleCancelComment,
  deleteComment,
}) {
  return (
    <div className="shade">
      <div className="delete-modal-container">
        <h2 className="delete-modal-header">
          Are you sure you want to delete this comment
        </h2>
        <span className="comment-name">{comment.user}</span>
        <span className="comment-text">{comment.text}</span>
        <span className="comment-date">Submitted: {comment.submitted}</span>
        <div className="buttons-container">
          <button
            className="delete-button"
            onClick={() => deleteComment(comment._id)}
          >
            Delete
          </button>
          <button
            className="cancel-button"
            onClick={() => handleCancelComment()}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
