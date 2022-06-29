import React from 'react';
import { Link } from 'react-router-dom';

export const Header: React.FC = () => {
  return (
    <nav>
      <Link to="/">
        <button type="button" className="button">
          Home Page
        </button>
      </Link>
      <Link to="/people">
        <button type="button" className="button">
          People Page
        </button>
      </Link>

    </nav>
  );
};
