import React from 'react';
import { NavLink } from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../../types';

interface Props {
  people: Person;
}

export const PersonLink: React.FC<Props> = ({ people }) => (
  <NavLink
    to={`/people/${people.slug}`}
    className={cn({
      'has-text-danger': people.sex === 'f',
    })}
  >
    {people.name}
  </NavLink>
);
