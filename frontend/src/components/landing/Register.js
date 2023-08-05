import React, { useState } from "react";
import PageWithIdentification from "./PageWithIdentification";

function Register({ onRegister }) {
  const [data, setData] = useState({
    password: "",
    email: ""
  });

  function handleChange(e) {
    const {name, value} = e.target;
    setData(prevState => ({...prevState, [name]: value}));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    onRegister(data);
  }

  return (
    <PageWithIdentification
      name="Регистрация"
      textSubmit="Зарегистрироваться"
      signatute="Уже зарегистрированы? "
      linkText="Войти"
      linkTo="/sign-in"
      onSubmit={handleSubmit}
      onChange={handleChange}
    />
  )
}

export default Register;
