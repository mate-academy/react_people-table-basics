import { Link } from 'react-router-dom';
import cn from 'classnames';
import React from 'react';
import { Person } from '../types';

interface Props {
  person: Person;
}

export const PersonLink: React.FC<Props> = ({ person }) => {
  const {
    name,
    sex,
    slug,
  } = person;

  return (
    <Link
      to={`/people/${slug}`}
      className={cn({
        'has-text-link': sex === 'm',
        'has-text-danger': sex === 'f',
      })}
    >
      {name}
    </Link>
  );
};
