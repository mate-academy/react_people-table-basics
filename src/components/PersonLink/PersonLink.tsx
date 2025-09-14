import React from 'react';
import { Person } from '../../types';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

interface Props {
  person: Person | null;
  name?: string;
}

export const PersonLink: React.FC<Props> = ({ person, name }) => {
  if (!person) {
    return <span>{name}</span>;
  }

  return (
    <Link
      to={`/people/${person.slug}`}
      className={classNames({
        'has-text-danger': person.sex === 'f',
      })}
    >
      {person.name}
    </Link>
  );
};
