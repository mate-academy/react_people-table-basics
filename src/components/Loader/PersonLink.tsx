import { Link } from 'react-router-dom';
import { Person } from '../../types';
import React from 'react';

type Props = {
  person: Person;
  children: React.ReactNode;
  className?: string;
};

export const PersonLink: React.FC<Props> = ({
  person,
  children,
  className,
}) => {
  return (
    <Link to={`/people/${person.slug}`} className={className}>
      {children}
    </Link>
  );
};
