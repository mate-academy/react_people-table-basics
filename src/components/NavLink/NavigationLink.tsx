import { NavLink } from 'react-router-dom';
import cn from 'classnames';
import { FC } from 'react';

interface Props {
  to: string,
  title: string,
}

export const NavigationLink: FC<Props> = (props) => {
  const { to, title } = props;

  return (
    <NavLink
      to={to}
      className={({ isActive }) => cn('navbar-item', {
        'has-background-grey-lighter': isActive,
      })}
    >
      {title}
    </NavLink>
  );
};
