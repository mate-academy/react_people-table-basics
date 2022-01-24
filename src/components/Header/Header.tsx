import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import './Header.scss';

type Props = {
  hash: string,
};

export const Header: React.FC<Props> = ({ hash }) => (
  <div className="Header">
    <nav className="Nav">
      <Link
        to="/"
        className={classNames('Nav__link', { 'Nav__link--active': hash === '#/' || hash === '/home' || hash === '' })}
      >
        Home
      </Link>
      <Link
        to="/people"
        className={classNames('Nav__link', { 'Nav__link--active': hash === '#/people' })}
      >
        People
      </Link>
    </nav>
  </div>
);
