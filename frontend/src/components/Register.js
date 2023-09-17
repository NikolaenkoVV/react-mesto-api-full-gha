import React from "react";
import { Link } from "react-router-dom";

function Register({ onRegister }) {
  const [email, setEmail] = React.useState();
  const [password, setPassword] = React.useState();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(email, password);
  };

  return (
    <div className="auth">
      <h2 className="auth__title">Регистрация</h2>
      <form className="auth__form" onSubmit={handleSubmit}>
        <input
          className="auth__input"
          name="email"
          type="email"
          placeholder="Email"
          value={email || ""}
          onChange={handleEmailChange}
          required
        />
        <input
          className="auth__input"
          name="password"
          type="password"
          placeholder="Пвроль"
          value={password || ""}
          onChange={handlePasswordChange}
          required
        />
        <button className="auth__button" type="submit">
          Зарегистрироваться
        </button>
      </form>
      <p className="auth__text">
        Уже зарегистрировны?&nbsp;
        <Link to="/sign-in" className="auth__link">
          Войти
        </Link>
      </p>
    </div>
  );
}

export default Register;
