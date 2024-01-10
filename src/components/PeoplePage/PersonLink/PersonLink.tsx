import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { PersonLinkProps } from '../PeoplePage.types';

export const PersonLink: FC<PersonLinkProps> = ({ person }) => (
  <NavLink
    to={`/people/${person.slug}`}
    className={classNames({
      'has-text-danger': person.sex === 'f',
    })}
  >
    {person.name}
  </NavLink>
);
