import React from 'react';
import { Person } from '../../types';
import { Link } from 'react-router-dom';
import cn from 'classnames';

interface Props {
  person: Person;
}

export const PersonLink: React.FC<Props> = ({ person }) => {
  const { name, slug, sex } = person;

  return (
    <Link
      to={`/people/${slug}`}
      className={cn({ 'has-text-danger': sex === 'f' })}
    >
      {name}
    </Link>
  );
};
