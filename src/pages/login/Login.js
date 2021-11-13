import { React, useState } from "react";
import { useForm } from "react-hook-form";
import "./Login.scss";

export default function Login({ setUserAuth }) {
  const { register, handleSubmit, errors } = useForm();
  const [loginErr, setLoginErr] = useState(false);

  const onSubmit = async (data) => {
    const formData = JSON.stringify(data);
    try {
      const req = await fetch(
        "https://still-atoll-78147.herokuapp.com/api/login",
        {
          method: "POST",
          body: formData,
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      const myJson = await req.json();
      if (req.status !== 200) {
        setLoginErr(true);
        return;
      }
      localStorage.setItem("token", myJson.token);
      localStorage.setItem("userAuth", true);
      setUserAuth(true);
    } catch (err) {
      setLoginErr(true);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form">
        <h1>Admin Login</h1>
        <div>
          <input
            className="form-input"
            autoComplete="username"
            type="text"
            placeholder="Username"
            {...register("username", { required: true })}
          ></input>
          {errors && (
            <span className="error-span">{errors.username.message}</span>
          )}
        </div>

        <div>
          <input
            className="form-input"
            autoComplete="current-password"
            placeholder="Password"
            type="password"
            {...register("password", { required: true })}
          ></input>
          {errors && (
            <span className="error-span">{errors.password.message} </span>
          )}
        </div>

        {loginErr && (
          <span className="error-span">Username or password incorrect</span>
        )}
        <button
          type="submit"
          onClick={((e) => e.preventDefault(), handleSubmit(onSubmit))}
        >
          Login
        </button>
      </form>
    </div>
  );
}
