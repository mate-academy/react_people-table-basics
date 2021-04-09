import React from 'react';
import { Link } from 'react-router-dom';

export const Header: React.FC = () => (
  <nav>
    <div>
      <Link to="/">
        HomePage
      </Link>
    </div>
    <div>
      <Link to="/people">
        PeoplePage
      </Link>
    </div>
    <div>
      <Link to="/">
        NotFoundPage
      </Link>
    </div>
  </nav>
);
