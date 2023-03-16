import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

type Props = {
  to: string;
  name: string | null;
  sex: string;
};

export const PersonNavigation: FC<Props> = ({ to, name, sex }) => (
  <NavLink
    to={`/people/${to}`}
    className={classNames({ 'has-text-danger': sex === 'f' })}
  >
    {name}
  </NavLink>
);
