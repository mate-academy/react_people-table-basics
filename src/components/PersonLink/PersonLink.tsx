import React from 'react';
import { Link } from 'react-router-dom';
import { Person } from '../../types';
import { getSlug } from '../../utils';

interface Props {
  person: Person;
}

export const PersonLink: React.FC<Props> = ({ person }) => {
  const isWoman = person.sex === 'f';
  const slug = getSlug(person);
  const linkPath = `/people/${slug}`;
  const className = isWoman ? 'has-text-danger' : '';

  return (
    <Link to={linkPath} className={className}>
      {person.name}
    </Link>
  );
};
