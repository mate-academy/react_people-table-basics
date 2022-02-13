import { FC } from 'react';
import { Link } from 'react-router-dom';

export const Header: FC = () => (
  <header>
    <nav className="App__nav nav box">
      <ul className="nav__list">
        <li className="nav__item navbar-item is-tab">
          <Link to="/">Home</Link>
        </li>

        <li className="nav__item navbar-item is-tab">
          <Link to="/people">People</Link>
        </li>
      </ul>
    </nav>
  </header>
);
