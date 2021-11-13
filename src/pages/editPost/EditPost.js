import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import "./EditPost.scss";
// components
import Loader from "../../components/loader/Loader";
import Comment from "../../components/comment/Comment";
import DeleteCommentModal from "../../components/comment/deleteModal/DeleteModal";
import DeletePostModal from "../../components/post/deleteModal/DeleteModal";

export default function EditPost() {
  const [post, setPost] = useState();
  const [comments, setComments] = useState();
  const [successMsg, setSuccessMsg] = useState(false);
  const [showDeletePostModal, setShowDeletePostModal] = useState(false);
  const [showDeleteCommentModal, setShowDeleteCommentModal] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState(null);

  const { register, handleSubmit, errors } = useForm();
  let navigate = useNavigate();
  let { id } = useParams();

  useEffect(() => {
    const getPosts = async () => {
      try {
        const postReq = await fetch(
          `https://still-atoll-78147.herokuapp.com/api/posts/${id}`
        );
        if (postReq.status !== 200) {
          return;
        }
        const postJson = await postReq.json();
        setPost(postJson.post);
      } catch (err) {}
    };
    getPosts();

    const getComments = async () => {
      try {
        const commentsReq = await fetch(
          `https://still-atoll-78147.herokuapp.com/api/posts/${id}/comments`
        );
        if (commentsReq.status !== 200) {
          return;
        }
        const commentsJson = await commentsReq.json();
        setComments(commentsJson.comments);
      } catch (err) {}
    };
    getComments();
    setSuccessMsg(false);
  }, []);

  const submitForm = async (data) => {
    const token = localStorage.getItem("token");
    const bearer = `Bearer ${token}`;
    const formData = JSON.stringify(data);
    try {
      const req = await fetch(
        `https://still-atoll-78147.herokuapp.com/api/posts/${id}`,
        {
          method: "PUT",
          body: formData,
          headers: {
            Authorization: bearer,
            "Content-Type": "application/json",
          },
        }
      );
      if (req.status !== 200) {
        return;
      }
      setSuccessMsg(true);
    } catch (err) {}
  };

  const deletePost = async () => {
    const token = localStorage.getItem("token");
    const bearer = `Bearer ${token}`;
    try {
      const req = await fetch(
        `https://still-atoll-78147.herokuapp.com/api/posts/${id}`,
        {
          method: "delete",
          headers: {
            Authorization: bearer,
            "Content-Type": "application/json",
          },
        }
      );
      if (req.status !== 200) {
        return;
      }
      await deleteAllComments();
      navigate("/posts");
    } catch (err) {
      console.error(err);
    }
  };

  const deleteComment = async (commentId) => {
    const token = localStorage.getItem("token");
    const bearer = `Bearer ${token}`;
    try {
      const req = await fetch(
        `https://still-atoll-78147.herokuapp.com/api/posts/${id}/comments/${commentId}`,
        {
          method: "delete",
          headers: {
            Authorization: bearer,
            "Content-Type": "application/json",
          },
        }
      );
      if (req.status !== 200) {
        return;
      }
      const newComments = comments.filter(
        (comment) => comment._id !== commentId
      );
      setComments(newComments);
      setShowDeleteCommentModal(false);
    } catch (err) {
      console.error(err);
    }
  };

  // comment modal
  const handleDeleteComment = (comment) => {
    setShowDeleteCommentModal(true);
    setCommentToDelete(comment);
  };

  const handleCancelComment = () => {
    setShowDeleteCommentModal(false);
  };

  // post modal
  const handleDeletePost = () => {
    setShowDeletePostModal(true);
  };

  const handleCancelPost = () => {
    setShowDeletePostModal(false);
  };

  const deleteAllComments = async () => {
    const token = localStorage.getItem("token");
    const bearer = `Bearer ${token}`;
    try {
      const req = await fetch(
        `https://still-atoll-78147.herokuapp.com/api/posts/${id}/comments`,
        {
          method: "delete",
          headers: {
            Authorization: bearer,
            "Content-Type": "application/json",
          },
        }
      );
      if (req.status !== 200) {
        return;
      }
      setComments();
      setShowDeleteCommentModal(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="layout">
      {post ? (
        <>
          <div className="edit-container">
            <div className="edit-form">
              {/* title */}
              <div className="form-group">
                <label className="form-label" htmlFor="title">
                  Title:
                </label>
                <input
                  className="edit-form-input title"
                  {...register("title", { required: true })}
                  defaultValue={post.title}
                ></input>
                {errors && <span>Required field</span>}
              </div>
              {/* description */}
              <div className="form-group">
                <label className="form-label" htmlFor="description">
                  Description:
                </label>
                <textarea
                  type="text"
                  className="edit-form-input description"
                  {...register("description", { required: true })}
                  defaultValue={post.description}
                ></textarea>
                {errors && <span>Required field</span>}
              </div>
              {/* body */}
              <div className="form-group">
                <label className="form-label" htmlFor="text">
                  Body:
                </label>
                <textarea
                  type="text"
                  className="edit-form-input body"
                  {...register("text", { required: true })}
                  defaultValue={post.text}
                ></textarea>
                {errors && <span>Required field</span>}
              </div>
              {/* author */}
              <div className="form-group">
                <label className="form-label" htmlFor="author">
                  Author:
                </label>
                <input
                  className="edit-form-input author"
                  {...register("author", { required: true })}
                  defaultValue={post.author}
                ></input>
                {errors && <span>Required field</span>}
              </div>
              {successMsg && <span>Updated successfully!</span>}

              <div>
                <button
                  className="update-button"
                  type="submit"
                  onClick={
                    ((e) => e.preventDefault(), handleSubmit(submitForm))
                  }
                >
                  Update
                </button>
              </div>
              <button
                className="delete-button"
                onClick={() => handleDeletePost()}
              >
                Delete
              </button>
            </div>
          </div>
          {comments ? (
            <div className="comments-container">
              <span className="comments-header">
                Comments ({comments.length})
              </span>
              {comments.map((comment) => {
                return (
                  <Comment
                    comment={comment}
                    handleCancelComment={handleCancelComment}
                    handleDeleteComment={handleDeleteComment}
                  />
                );
              })}
            </div>
          ) : (
            <div className="comments-container">
              <span className="comments-header">Comments (0)</span>
            </div>
          )}
        </>
      ) : (
        <Loader />
      )}

      {showDeleteCommentModal && (
        <DeleteCommentModal
          comment={commentToDelete}
          handleCancelComment={handleCancelComment}
          deleteComment={deleteComment}
        />
      )}
      {showDeletePostModal && (
        <DeletePostModal
          post={post}
          handleCancelPost={handleCancelPost}
          deletePost={deletePost}
        />
      )}
    </div>
  );
}
