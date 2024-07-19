import React from 'react';
import { Person } from '../../types';
import { Link } from 'react-router-dom';

interface Props {
  person: Person;
  className?: string;
  children: React.ReactNode;
}

export const PersonLink: React.FC<Props> = ({
  person,
  className,
  children,
}) => {
  return (
    <Link to={`/people/${person.slug}`} className={className}>
      {children}
    </Link>
  );
};
