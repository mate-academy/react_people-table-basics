import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

type Props = {
  to: string,
  text: string,
};

export const PageNavLink: React.FC<Props> = ({ text, to }) => {
  return (
    <NavLink
      to={to}
      end
      className={({ isActive }) => classNames(
        'navbar-item', { 'has-background-grey-lighter': isActive },
      )}
    >
      {text}
    </NavLink>
  );
};
