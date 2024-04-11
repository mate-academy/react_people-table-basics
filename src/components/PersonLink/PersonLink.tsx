import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { Person } from '../../types';
import { Sex } from '../../types/Sex';

export const PersonLink = ({ person }: { person: Person }) => {
  return (
    <Link
      to={`/people/${person.slug}`}
      className={classNames({
        'has-text-danger': person.sex === Sex.Female,
      })}
    >
      {person.name}
    </Link>
  );
};
