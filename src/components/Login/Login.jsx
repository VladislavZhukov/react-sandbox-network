import React from "react";
import { Redirect } from "react-router";
import lm from "./Login.module.css";
import LoginReduxForm from "./LoginReduxForm";

const Login = (props) => {
  const onSubmit = (formData) => {
    props.login(formData.email, formData.password, formData.rememberMe);
  };

  if (props.isAuth) {
    return <Redirect to={"/profile"} />
  }
  return (
    <div className={lm.header}>
      <h1>Login</h1>
      <LoginReduxForm onSubmit={onSubmit} />
    </div>
  );
};

export default Login;
