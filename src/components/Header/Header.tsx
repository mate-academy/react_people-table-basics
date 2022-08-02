import classNames from 'classnames';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Person } from '../../types/Person';

import './Header.scss';

type Props = {
  people: Person[],
};

export const Header: React.FC<Props> = ({ people }) => {
  return (
    <header className="header">
      <nav className="navigation">
        <NavLink
          to="/"
          className="tag is-primary navigation__item is-large is-light"
        >
          Home
        </NavLink>

        <NavLink
          to="/people"
          className={classNames('tag is-primary is-light is-large', {
            'is-loading': !people,
          })}
        >
          People
        </NavLink>
      </nav>
    </header>
  );
};
