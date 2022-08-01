import classNames from 'classnames';
import React from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';

import './App.scss';
import { PeopleTable } from './components/PeopleTable';

export const App: React.FC = () => {
  const getLinkClass = ({ isActive }: { isActive: boolean }): string => {
    return isActive ? 'is-info' : 'is-light';
  };

  return (
    <div className="App">
      <nav className="buttons m-5">
        <NavLink
          to="/"
          className={(param) => classNames('button', getLinkClass(param))}
        >
          Home
        </NavLink>
        <NavLink
          to="/people"
          className={(param) => classNames('button', getLinkClass(param))}
        >
          People
        </NavLink>
      </nav>

      <Routes>
        <Route
          path="/"
          element={(
            <h1 className="title is-3 ml-5">
              Home page
            </h1>
          )}
        />

        <Route
          path="people"
          element={(
            <>
              <h1 className="title is-3 ml-5">
                People page
              </h1>

              <PeopleTable />
            </>
          )}
        />

        <Route path="*" element="Page not found" />
      </Routes>
    </div>
  );
};
