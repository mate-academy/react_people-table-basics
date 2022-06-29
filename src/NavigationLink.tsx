import React from 'react';
import { Link } from 'react-router-dom';

export const NavigationLink:React.FC = () => (
  <nav>
    <div>
      <Link to="/" className="button is-primary">Home</Link>
      <Link to="people" className="button is-link">People</Link>
    </div>
  </nav>
);
