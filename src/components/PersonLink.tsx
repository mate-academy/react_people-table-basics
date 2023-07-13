import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { Person } from '../types';

type Props = {
  person: Person;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const isWoman = person.sex === 'f';

  return (
    <Link to={`/people/${person.slug}`} className={classNames({ 'has-text-danger': isWoman })}>
      {person.name}
    </Link>
  );
};
