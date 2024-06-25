import React from 'react';
import { NavLink } from 'react-router-dom';
import { Person } from '../../types';

type Props = {
  person: Person;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  return (
    <NavLink
      className={person.sex === 'f' ? 'has-text-danger' : ''}
      to={`../${person.slug}`}
    >
      {person.name}
    </NavLink>
  );
};
