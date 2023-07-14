import classNames from 'classnames';
import { FC } from 'react';
import { NavLink } from 'react-router-dom';

type Props = {
  to: string;
  title: string;
};

export const NavbarLink: FC<Props> = ({ to, title }) => {
  const linkClassNames = (
    { isActive }: { isActive: boolean },
  ) => classNames('navbar-item', {
    'has-background-grey-lighter': isActive,
  });

  return (
    <NavLink
      to={to}
      className={linkClassNames}
    >
      {title}
    </NavLink>
  );
};
