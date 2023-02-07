import cn from 'classnames';
import { FC } from 'react';
import { NavLink, To } from 'react-router-dom';

interface Props {
  to: To;
  title: string;
}

export const CustomNavLink: FC<Props> = ({ to, title }) => {
  return (
    <NavLink
      to={to}
      className={(navLinkProps) => {
        const { isActive } = navLinkProps;

        return cn('navbar-item', {
          'has-background-grey-lighter': isActive,
        });
      }}
    >
      {title}
    </NavLink>
  );
};
