import React from 'react';
import { Person } from '../types';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

interface Props {
  person: Person | undefined;
  parentName?: string | null;
}

export const PersonLink: React.FC<Props> = ({ person, parentName }) => {
  return person ? (
    <NavLink
      className={classNames({ 'has-text-danger': person.sex === 'f' })}
      to={`/people/${person.slug}`}
    >
      {person.name}
    </NavLink>
  ) : (
    parentName || '-'
  );
};
