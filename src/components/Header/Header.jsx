import React from 'react';
import './Header.scss';
import { Route, Link } from 'react-router-dom';

const imagePath = 'https://images-na.ssl-images-amazon.com'
  + '/images/I/61yoTtDxuiL._AC_SL1500_.jpg';

export const Header = () => (
  <div className="header">
    <img
      src={imagePath}
      alt="rainbow"
      className="header__icon"
    />

    <div className="header__link-item">
      <a href="/home">Home page</a>
    </div>

    <div className="header__link-item">
      <a href="/people">People page</a>
    </div>

    <div className="header__line" />
  </div>
);
