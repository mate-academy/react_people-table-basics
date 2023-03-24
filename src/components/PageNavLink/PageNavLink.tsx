import { FunctionComponent } from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

interface PageNavLinkProps {
  to: string;
  text: string;
}
export const PageNavLink: FunctionComponent<PageNavLinkProps> = ({
  to,
  text,
}) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => classNames(
        'navbar-item', {
          'has-background-grey-lighter': isActive,
        },
      )}
    >
      {text}
    </NavLink>
  );
};
