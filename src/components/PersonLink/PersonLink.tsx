import React from 'react';
import { Person } from '../../types';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

type Props = {
  people: Person[];
  name: string | null;
};

export const PersonLink: React.FC<Props> = ({ people, name }) => {
  const foundPerson = people.find(person => person.name === name);

  return foundPerson ? (
    <Link
      to={`/people/${foundPerson.slug}`}
      className={classNames({ 'has-text-danger': foundPerson.sex === 'f' })}
    >
      {foundPerson.name}
    </Link>
  ) : (
    <span>{name}</span>
  );
};
