import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { Person } from '../../types';

interface Props {
  person: Person
}

export const PeopleLink: React.FC<Props> = ({ person }) => {
  const {
    slug,
    name,
    sex,
  } = person;

  return (
    <Link
      className={classNames(
        { 'has-text-danger': sex === 'f' },
      )}
      to={`/people/${slug}`}
    >
      {name}
    </Link>
  );
};
