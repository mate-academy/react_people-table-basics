import classNames from 'classnames';
import { FC } from 'react';
import { NavLink } from 'react-router-dom';

type Props = {
  link: string;
  title: string;
};

export const NavigationLink: FC<Props> = (props) => {
  const {
    link,
    title,
  } = props;

  return (
    <NavLink
      to={link}
      className={({ isActive }) => classNames(
        'navbar-item',
        { 'has-background-grey-lighter': isActive },
      )}
    >
      {title}
    </NavLink>
  );
};
