import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { Person } from '../types';

interface Props {
  person: Person,
}

export const PersonLink: FC<Props> = ({ person }) => (
  <NavLink
    to={`/people/${person.slug}`}
    className={person.sex === 'f' ? 'has-text-danger' : ''}
  >
    {person.name}
  </NavLink>
);
