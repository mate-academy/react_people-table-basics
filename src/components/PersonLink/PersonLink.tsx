import React from 'react';
import { Person } from '../../types';
import { NavLink } from 'react-router-dom';
import cn from 'classnames';

type Props = {
  person: Person;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  return (
    <NavLink
      to={`/people/${person.slug}`}
      className={cn({ 'has-text-danger': person.sex === 'f' })}
    >
      {person.name}
    </NavLink>
  );
};
