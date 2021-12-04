import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

import { Wrapper } from '../Wrapper';

import './Nav.scss';

type Props = {
  className: string;
};

export const Nav: React.FC<Props> = ({ className }) => {
  return (
    <nav className={classNames('Nav', className)}>
      <Wrapper>
        <ul className="Nav__list">
          <li className="Nav__item">
            <NavLink
              to="/"
              className={({ isActive }) => classNames('Nav__link', { 'Nav__link--active': isActive })}
            >
              Home
            </NavLink>
          </li>

          <li className="Nav__item">
            <NavLink
              to="people"
              className={({ isActive }) => classNames('Nav__link', { 'Nav__link--active': isActive })}
            >
              People
            </NavLink>
          </li>
        </ul>
      </Wrapper>
    </nav>
  );
};
