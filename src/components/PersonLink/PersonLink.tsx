import React from 'react';
import { NavLink } from 'react-router-dom';
import { Person } from '../../types';
import classNames from 'classnames';

type Props = {
  person: Person;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const { name, slug, sex } = person;

  return (
    <NavLink
      className={classNames({ 'has-text-danger': sex === 'f' })}
      to={`../${slug}`}
    >
      {name}
    </NavLink>
  );
};
