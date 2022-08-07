import { Link } from 'react-router-dom';

import './Header.scss';

export const Header = () => (
  <header>
    <nav>
      <Link to="/">
        <button
          type="button"
          className="header-button home"
        >
          Home page
        </button>
      </Link>
      <br />
      <Link to="/people">
        <button
          type="button"
          className="header-button people"
        >
          People page
        </button>
      </Link>
    </nav>
  </header>
);
