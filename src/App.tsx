import React from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import classNames from 'classnames';

import * as PeopleTable from './components/PeopleTable';
import './App.scss';

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

              <PeopleTable.PeopleTable />
            </>
          )}
        />

        <Route path="*" element="Page not found" />
      </Routes>
    </div>
  );
};
