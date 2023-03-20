import React from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

type Props = {
  to: string;
  name: string | null;
  sex: string;
};

export const PersonNav: React.FC<Props> = ({ to, name, sex }) => (
  <NavLink
    to={`/people/${to}`}
    className={classNames({ 'has-text-danger': sex === 'f' })}
  >
    {name}
  </NavLink>
);
