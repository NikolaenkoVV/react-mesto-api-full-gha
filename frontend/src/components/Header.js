import React from 'react';
import logo from "../images/header-logo.svg";
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

function Header({emailNote, onSignOut}) {
  const location = useLocation();
  return (
    <header className="header">
      <img src={logo} alt='Логотип MestoRussia' className='header__logo'/>
      <nav className="header__nav">
        <p className="header__email-note">{emailNote}</p>
        {location.pathname === "/sign-in" && <Link to="/sign-up" className='header__link'>Регистрация</Link>}
        {location.pathname === "/sign-up" && <Link to="/sign-in" className='header__link'>Войти</Link>}
        {location.pathname === "/" && <Link to="/sign-in" className='header__link' onClick={onSignOut}>Выйти</Link>}
      </nav>
    </header>
  );
};

export default Header;