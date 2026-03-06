import { NavLink } from 'react-router-dom';
import { Person } from '../types';
import React from 'react';

type Props = {
  person: Person;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  return (
    <NavLink
      to={`/people/${person.slug}`}
      className={person.sex === 'm' ? '' : 'has-text-danger'}
    >
      {person.name}
    </NavLink>
  );
};
