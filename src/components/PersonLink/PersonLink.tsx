import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../../types/Person';

interface Props {
  name: string | null;
  people: Person[];
}

export const PersonLink: React.FC<Props> = ({ name, people }) => {
  if (!name) {
    return <>-</>;
  }

  const person = people.find(p => p.name === name);

  if (!person) {
    return <>{name}</>;
  }

  return (
    <Link
      to={`/people/${person.slug}`}
      className={classNames({
        'has-text-danger': person.sex === 'f',
      })}
    >
      {person.name}
    </Link>
  );
};
