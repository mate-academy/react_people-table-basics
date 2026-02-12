import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../../types/Person';

interface Props {
  person?: Person | null;
  foundPerson?: string | null;
}

export const PersonLink: React.FC<Props> = ({ person, foundPerson }) => {
  if (!person && !foundPerson) {
    return <span>-</span>;
  }

  if (!person) {
    return <span>{foundPerson}</span>;
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
