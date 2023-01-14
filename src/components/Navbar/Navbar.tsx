import React from 'react';
import { PageNavLink } from '../PageNavLink/PageNavLink';

export const Navbar: React.FC = () => (
  <div className="navbar-brand">
    <PageNavLink to="/" text="Home" />
    <PageNavLink to="/people" text="People" />
  </div>
);
