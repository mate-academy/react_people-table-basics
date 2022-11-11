import classNames from 'classnames';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Person } from '../../types';

interface Props {
  person: Person,
}

export const PersonLink: React.FC<Props> = ({ person }) => (
  <NavLink
    to={`/people/${person.slug}`}
    className={classNames({
      'has-text-danger': person.sex === 'f',
    })}
  >
    {person.name}
  </NavLink>
);
