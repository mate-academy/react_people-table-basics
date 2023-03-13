import classNames from 'classnames';
import { FC } from 'react';
import { NavLink } from 'react-router-dom';

type Props = {
  to: string,
  text: string | null,
  sex: string,
};

export const PersonNavLink: FC<Props> = ({ to, text, sex }) => (
  <NavLink
    className={classNames({ 'has-text-danger': sex === 'f' })}
    to={`${to}`}
  >
    {text}
  </NavLink>
);
