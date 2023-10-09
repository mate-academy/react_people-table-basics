import React from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';

interface PersonLinkProps {
  to: string;
  name: string;
  sex: string;
  isMother?: boolean;
}

export const PersonLink: React.FC<PersonLinkProps> = ({
  to,
  name,
  sex,
  isMother = false,
}) => {
  return (
    <Link
      to={to}
      className={cn({
        'has-text-danger': sex === 'f',
      })}
    >
      {isMother && (
        <span className="has-text-danger">
          {name}
        </span>
      )}
      {!isMother && name}
    </Link>
  );
};
