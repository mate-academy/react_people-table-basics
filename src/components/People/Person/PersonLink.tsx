import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../../../types';

export const Personlink: FC<Pick<Person, 'name' | 'sex' | 'slug'>> = ({
  name,
  sex,
  slug,
}) => (
  <NavLink
    to={`/people/${slug}`}
    replace
    className={classNames({ 'has-text-danger': sex === 'f' })}
  >
    {name}
  </NavLink>
);
