import classNames from 'classnames';
import React from 'react';
import { NavLink, To } from 'react-router-dom';

interface Props {
  to: To;
  title: string;
}

export const CustomNavLink: React.FC<Props> = ({ to, title }) => {
  return (
    <NavLink
      to={to}
      className={(props) => {
        const { isActive } = props;

        return classNames('navbar-item', {
          'has-background-grey-lighter': isActive,
        });
      }}
    >
      {title}
    </NavLink>
  );
};
