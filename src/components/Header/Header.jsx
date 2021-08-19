import React from 'react';
import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <>
      <Link to="/">Home</Link>
      <Link to="/people">People</Link>
    </>
  );
};
