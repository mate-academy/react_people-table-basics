import { Link } from 'react-router-dom';
import classNames from 'classnames';
import React from 'react';
import { Person } from '../../types';

interface Props {
  person: Person;
}

export const PersonLink: React.FC<Props> = ({ person }) => {
  const {
    name,
    born,
    sex,
  } = person;
  const personLink = `${name}-${born}`;

  return (
    <Link
      to={`/people/${personLink}`}
      className={classNames({
        'has-text-danger': sex === 'f',
      })}
    >
      {name}
    </Link>
  );
};
