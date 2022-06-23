import React from 'react';
import { Link } from 'react-router-dom';

export const Header: React.FC = () => (
  <div className="link-dark btn-group">
    <Link to="/" className="link-dark btn btn-outline-primary">Home</Link>
    <Link to="people" className="link-dark ps-2 btn btn-outline-primary">
      People
    </Link>
  </div>
);
