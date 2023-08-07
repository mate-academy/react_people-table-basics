import React from 'react';
import { Person } from '../types';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

interface Props {
  person: Person,
}

export const PeopleLink: React.FC<Props> = ({person}) => {
  return (
    <Link
    className={classNames({
      'has-text-danger': person.sex === 'f',
    })}
    to={`${person.slug}`}
  >
    {person.name}
  </Link>
  );
};
