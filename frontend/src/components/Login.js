import React from "react";

function Login({ onLogin }) {
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
    onLogin(email, password);
  };

  return (
    <div className="auth">
      <h2 className="auth__title">Вход</h2>
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
          placeholder="Пароль"
          value={password || ""}
          onChange={handlePasswordChange}
          required
        />
        <button className="auth__button" type="submit">
          Войти
        </button>
      </form>
    </div>
  );
}

export default Login;
