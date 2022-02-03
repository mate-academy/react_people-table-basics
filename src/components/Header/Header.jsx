/* eslint-disable react/jsx-filename-extension */
import { Link } from 'react-router-dom';
import './Header.css';

export const Header = () => (
  <header className="header">
    <Link to="/">
      Home Page
    </Link>
    <Link to="/people">
      People Page
    </Link>
  </header>
);
