import classNames from 'classnames';
import { memo } from 'react';
import { NavLink } from 'react-router-dom';

export type Props = {
  to: string
  text: string
};

export const PageNavLinks: React.FC<Props> = memo(({ to, text }) => {
  return (
    <NavLink
      className={({ isActive }) => {
        return classNames('navbar-item',
          { 'has-background-grey-lighter': isActive });
      }}
      to={to}
    >
      {text}
    </NavLink>
  );
});
