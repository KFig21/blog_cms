import { useState, React, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../context/AuthContext";
import "./NewPost.scss";

export default function NewPost() {
  const [successMsg, setSuccessMsg] = useState(false);
  const { register, handleSubmit } = useForm();
  const { user } = useContext(AuthContext);
  let navigate = useNavigate();

  console.log(user);

  const submitForm = async (data) => {
    if (user.isAdmin) {
      const token = localStorage.getItem("token");
      const bearer = `Bearer ${token}`;
      const formData = JSON.stringify(data);
      try {
        const req = await fetch(
          `https://still-atoll-78147.herokuapp.com/api/posts/`,
          {
            method: "post",
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
        navigate("/posts");
        setSuccessMsg(true);
      } catch (err) {}
    } else {
      console.log("test account cannot send a post");
    }
  };
  return (
    <div className="layout">
      <div className="new-container">
        <div className="new-form">
          {!user.isAdmin && (
            <div className="test-account-message">
              USER DOES NOT HAVE ADMIN PRIVILEGES TO SUBMIT POST
            </div>
          )}
          {/* title */}
          <div className="form-group">
            <label className="form-label" htmlFor="title">
              Title:
            </label>
            <input
              type="text"
              className="edit-form-input title"
              {...register("title", { required: true })}
            ></input>
          </div>
          {/* description */}
          <div className="form-group">
            <label className="form-label" htmlFor="description">
              Description:
            </label>
            <textarea
              className="edit-form-input description"
              {...register("description", { required: true })}
            ></textarea>
          </div>
          {/* body */}
          <div className="form-group">
            <label className="form-label" htmlFor="text">
              Body:
            </label>
            <textarea
              className="edit-form-input body"
              {...register("text", { required: true })}
            ></textarea>
          </div>

          <div className="form-group">
            <label className="form-label">Author:</label>
            <input
              className="edit-form-input author"
              {...register("author", { required: true })}
            ></input>
          </div>
          <button
            type="submit"
            onClick={((e) => e.preventDefault(), handleSubmit(submitForm))}
          >
            Submit
          </button>
          {!user.isAdmin && (
            <div className="test-account-message">
              USER DOES NOT HAVE ADMIN PRIVILEGES TO SUBMIT POST
            </div>
          )}
          {successMsg && <span>Submited successfully!</span>}
        </div>
      </div>
    </div>
  );
}
