import React from 'react';
import { Person } from '../types';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

type Props = {
  person: Person;
  asText?: boolean;
};

export const PersonLink: React.FC<Props> = ({ person, asText = false }) => {
  if (asText) {
    return <span>{person.name}</span>;
  }

  return (
    <Link
      to={`/people/${person.slug}`}
      className={classNames(person.sex === 'f' ? 'has-text-danger' : '')}
    >
      {person.name}
    </Link>
  );
};
