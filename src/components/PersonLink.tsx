import React from 'react';
import { NavLink } from 'react-router-dom';
import type { Person } from '../pages/PeoplePage';

export const makeSlug = (name: string) =>
  name.trim().toLowerCase().replace(/\s+/g, '-');

export const PersonLink: React.FC<{ person: Person }> = ({ person }) => {
  const slug = makeSlug(person.name);
  const sexClass =
    person.sex === 'male'
      ? 'has-text-info'
      : person.sex === 'female'
        ? 'has-text-danger'
        : '';

  return (
    <NavLink
      to={`/people/${slug}`}
      className={({ isActive }) =>
        `${sexClass} ${isActive ? 'has-text-weight-bold' : ''}`
      }
      data-cy="PersonLink"
    >
      {person.name}
    </NavLink>
  );
};
