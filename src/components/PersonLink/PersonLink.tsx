import React from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../../types';

interface Props {
  person: Person
  id?: string
}

export const PersonLink: React.FC<Props> = ({ person, id }) => {
  return (
    <Link
      className={cn({ 'has-text-danger': person.sex === 'f' })}
      to={`../${person.slug}`}
      id={id}
    >
      {person.name}
    </Link>
  );
};
