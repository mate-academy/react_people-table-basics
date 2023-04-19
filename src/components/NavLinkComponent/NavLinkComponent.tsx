import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

type Props = {
  title: string,
  to: string,
};

export const NavLinkComponent: React.FC<Props> = ({ title, to }) => {
  return (
    <NavLink
      className={({ isActive }) => (
        classNames(
          'navbar-item',
          { 'has-background-grey-lighter': isActive },
        )
      )}
      to={to}
    >
      {title}
    </NavLink>
  );
};
