import React from 'react';
import { Link } from 'react-router-dom';

type Props = {
  to: string;
  className?: string;
  children: React.ReactNode;
};

export const PersonLink: React.FC<Props> = ({ to, className, children }) => {
  return (
    <Link to={to} className={className}>
      {children}
    </Link>
  );
};
