import React from 'react';
import cn from 'classnames';
import { Person } from '../types';
import { Link } from 'react-router-dom';

type Props = {
  name: string | null;
  people: Person[];
};

export const PeopleLink: React.FC<Props> = ({ name, people }) => {
  if (!name) {
    return <span>-</span>;
  }

  const person = people.find(pers => pers.name === name);

  if (!person) {
    return <span>{name}</span>;
  }

  return (
    <Link
      to={`/people/${person.slug}`}
      className={cn({ 'has-text-danger': person.sex === 'f' })}
    >
      {person.name}
    </Link>
  );
};
