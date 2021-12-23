import { React, useState, useContext } from "react";
import { useForm } from "react-hook-form";
import "./Login.scss";
import { AuthContext } from "../../context/AuthContext";

export default function Login({ setUserAuth }) {
  const { register, handleSubmit, errors } = useForm();
  const [loginErr, setLoginErr] = useState(false);
  const { dispatch } = useContext(AuthContext);

  const onSubmit = async (data) => {
    console.log(data);
    const formData = JSON.stringify(data);

    try {
      const req = await fetch(
        "https://still-atoll-78147.herokuapp.com/api/login",
        // "http://localhost:3000/api/login",
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
      dispatch({ type: "LOGIN_SUCCESS", payload: myJson });
      setUserAuth(true);
    } catch (err) {
      setLoginErr(true);
    }
  };

  const justVisiting = async () => {
    const formData = JSON.stringify({
      username: process.env.REACT_APP_TEST_ACCOUNT_USERNAME,
      password: process.env.REACT_APP_TEST_ACCOUNT_PASSWORD,
    });
    try {
      const req = await fetch(
        "https://still-atoll-78147.herokuapp.com/api/login",
        // "http://localhost:3000/api/login",
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
      dispatch({ type: "LOGIN_SUCCESS", payload: myJson });
      setUserAuth(true);
    } catch (err) {
      setLoginErr(true);
    }
  };

  return (
    <>
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
      <div className="just-visiting">
        Wanna look around? <button onClick={justVisiting}>Just visiting</button>
      </div>
    </>
  );
}
