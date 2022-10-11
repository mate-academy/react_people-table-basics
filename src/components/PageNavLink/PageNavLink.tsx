import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

type Props = {
  to: string;
  text: string;
  end?: boolean;
};
export const PageNavLink: React.FC<Props> = ({ to, text, end }) => (
  <NavLink
    className={({ isActive }) => classNames(
      'navbar-item',
      { 'has-background-grey-lighter': isActive },
    )}
    to={to}
    end={end}
  >
    {text}
  </NavLink>
);
