import React from 'react';
import cl from 'classnames';

import { Person } from '../../types';
import { Link } from 'react-router-dom';

type Props = {
  people: Person[];
  name: string | null;
};

export const PersonLink: React.FC<Props> = ({ people, name }) => {
  if (!name) {
    return <span>-</span>;
  }

  const foundPerson = people.find(person => person.name === name);

  if (!foundPerson) {
    return <span>{name}</span>;
  }

  return (
    <Link
      to={`/people/${foundPerson.slug}`}
      className={cl({ 'has-text-danger': foundPerson.sex === 'f' })}
    >
      {name}
    </Link>
  );
};
