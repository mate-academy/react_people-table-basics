import classNames from 'classnames';
import React from 'react';
import { Link } from 'react-router-dom';
import { Person } from './types';

type Props = {
  person: Person,
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  return (
    <Link
      className={classNames({
        'has-text-danger': person.sex === 'f',
      })}
      to={`/people/${person.slug}`}
    >
      {person.name}
    </Link>
  );
};
