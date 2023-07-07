import React from 'react';
import { Person } from '../../types';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

interface Props {
  person: Person;
}

export const PersonLink: React.FC<Props> = ({ person }) => {
  const { slug, name, sex } = person;

 return (
  <NavLink
    to={`/people/:${slug}`}
    className={classNames({ 'has-text-danger': sex === 'f'})}
  >
    {name}
  </NavLink>
  )
};
