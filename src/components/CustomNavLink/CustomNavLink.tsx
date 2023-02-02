import classNames from 'classnames';
import { FC } from 'react';
import { NavLink, To } from 'react-router-dom';

interface Props {
  to: To;
  title: string;
}

export const CustomNavLink: FC<Props> = (props) => {
  const { to, title } = props;

  return (
    <NavLink
      to={to}
      className={(navLinkProps) => {
        const { isActive } = navLinkProps;

        return classNames('navbar-item', {
          'has-background-grey-lighter': isActive,
        });
      }}
    >
      {title}
    </NavLink>
  );
};
