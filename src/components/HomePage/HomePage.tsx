import React from 'react';
import { Link } from 'react-router-dom';

export const HomePage: React.FC = () => (
  <>
    <h1 className="title">Home Page</h1>
    <p>
      Click <Link to="/people">People</Link> to see the people table.
    </p>
  </>
);
