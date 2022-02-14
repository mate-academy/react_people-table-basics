import React from 'react';
import { Link } from 'react-router-dom';

export const Header: React.FC = () => {
  return (
    <>
      <h1 className="title">People table</h1>

      <nav className="App__nav navbar is-spaced column is-half">
        <Link className="App__nav-link" to="/">Home</Link>
        <Link className="App__nav-link" to="/people">People</Link>
      </nav>
    </>
  );
};
