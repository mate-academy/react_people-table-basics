import React from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../types/Person';

type Props = {
  person: Person,
  slug: string
};

export const PersonLink: React.FC<Props> = ({ person, slug }) => {
  return (
    <Link
      to={`../${slug}`}
      className={cn({ 'has-text-danger': person.sex === 'f' })}
    >
      {person.name}
    </Link>
  );
};
