import React from 'react';
import { Person } from '../../types';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

type Props = {
  name: string | null;
  people: Person[];
};

export const PersonLink: React.FC<Props> = ({ people, name }) => {
  if (!name) {
    return '-';
  }

  const foundPerson = people.find(person => person.name === name);

  if (!foundPerson) {
    return name;
  }

  return (
    <Link
      to={`/people/${foundPerson.slug}`}
      className={classNames({ 'has-text-danger': foundPerson.sex === 'f' })}
    >
      {name}
    </Link>
  );
};
