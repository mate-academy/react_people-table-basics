import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

interface Props {
  title: string;
  link: string;
}

export const NavItem: React.FC<Props> = ({ title, link }) => {
  return (
    <NavLink
      to={link}
      className={({ isActive }) => classNames('navbar-item', {
        'has-background-grey-lighter': isActive,
      })}
    >
      {title}
    </NavLink>
  );
};
