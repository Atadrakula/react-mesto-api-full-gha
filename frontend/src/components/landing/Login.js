import React, { useState } from "react";
import PageWithIdentification from "./PageWithIdentification";

function Login({ onLogin }) {

  const [data, setData] = useState({
    password: "",
    email: ""
  });

  function handleChange(e) {
    const {name, value} = e.target;
    setData(prevState => ({...prevState, [name]: value}));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onLogin(data);
  }

  return (
    <PageWithIdentification
      name="Вход"
      textSubmit="Войти"
      signatute=""
      linkText=""
      linkTo="#"
      onSubmit={handleSubmit}
      onChange={handleChange}
    />
  )
}

export default Login;
