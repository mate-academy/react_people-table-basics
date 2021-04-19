import React from 'react';
import './Header.scss';
import { Link } from 'react-router-dom';

const imagePath = 'https://images-na.ssl-images-amazon.com'
  + '/images/I/61yoTtDxuiL._AC_SL1500_.jpg';

export const Header = () => (
  <div className="header">
    <img
      src={imagePath}
      alt="rainbow"
      className="header__icon"
    />

    <div className="header__item">
      <Link to="/home" className="header__link">Home page</Link>
    </div>

    <div className="header__item">
      <Link to="/people" className="header__link">People page</Link>
    </div>

    <div className="header__line" />
  </div>
);
