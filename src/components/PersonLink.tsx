import React from 'react';
import { Person } from '../types';
import { Link } from 'react-router-dom';

interface PersonLinkProps {
  person: Person;
  onClick?: (slug: string) => void;
}

export const PersonLink: React.FC<PersonLinkProps> = ({ person }) => {
  const { name, sex, slug } = person;
  const className = sex === 'f' ? 'has-text-danger' : '';

  return (
    <Link to={`/people/${slug}`} className={className}>
      {name}
    </Link>
  );
};
