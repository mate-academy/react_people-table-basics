import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

type Props = {
  to: string,
  title: string,
};

export const PageNavLink: React.FC<Props> = ({ to, title }) => {
  return (
    <NavLink
      className={({ isActive }) => classNames(
        'navbar-item',
        {
          'has-background-grey-lighter': isActive,
        },
      )}
      to={to}
    >
      {title}
    </NavLink>
  );
};
