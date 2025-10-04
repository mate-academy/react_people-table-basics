import React from 'react';
import { Link } from 'react-router-dom';
import { Person } from '../types';
import classNames from 'classnames';

type Props = {
  person?: Person | null;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  if (!person) {
    return null;
  }

  return (
    <Link
      to={`/people/${person.slug}`}
      className={classNames({ 'has-text-danger': person.sex === 'f' })}
    >
      {person.name}
    </Link>
  );
};
