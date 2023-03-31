import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

interface CustomNavLinkProps {
  to: string;
  label: string;
}

export const CustomNavLink = ({ to, label }: CustomNavLinkProps) => {
  return (
    <NavLink
      className={({ isActive }) => (
        classNames('navbar-item', {
          'has-background-grey-lighter': isActive,
        })
      )}
      to={to}
    >
      {label}
    </NavLink>
  );
};
