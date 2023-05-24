import classNames from 'classnames';
import { NavLink, useNavigate } from 'react-router-dom';
import React from 'react';

type Props = {
  to: string,
  navText: string,
};

export const PageNavLink: React.FC<Props> = ({ to, navText }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (to === '/') {
      navigate('/');
    } else {
      navigate(`/${to}`);
    }
  };

  return (
    <NavLink
      className={({ isActive }) => classNames(
        'navbar-item', { 'has-background-grey-lighter': isActive },
      )}
      to={to}
      onClick={handleClick}
    >
      {navText}
    </NavLink>
  );
};
