import React from 'react';
import { NavLink } from 'react-router-dom';

interface Props {
  to: string;
  name: string;
  className?: string;
}

export const PersonLinkItem: React.FC<Props> = ({ to, name, className }) => {
  return (
    <NavLink to={to} className={className}>
      {name}
    </NavLink>
  );
};
