import './App.scss';
import React, { useEffect, useState } from 'react';
import { Route, Routes, NavLink } from 'react-router-dom';
import 'bulma/css/bulma.css';
import classNames from 'classnames';
import { PeoplePage } from './elements/PeoplePage';
import { Persone } from './react-app-env';

// eslint-disable-next-line max-len
const API_URL = 'https://mate-academy.github.io/react_people-table/api/people.json';

const getPeople = async () => {
  const res = await fetch(API_URL);

  return res.json();
};

const App: React.FC = () => {
  const [people, setPeople] = useState<Persone[]>([]);
  const [activeLi, setActiveLi] = useState(false);

  useEffect(() => {
    getPeople().then(peple => {
      setPeople(peple);
    });
  }, []);

  const getLinkClass = ({ isActive }: { isActive: boolean }) => {
    return (isActive ? 'is-active' : '');
  };

  return (
    <div className="App">
      <h1>People table</h1>

      <div className="tabs is-centered is-boxed">
        <ul>
          <li
            className={classNames('', { 'is-active': !activeLi })}
          >
            <NavLink
              to="/"
              className={getLinkClass}
              onClick={() => setActiveLi(!activeLi)}
            >
              Home
            </NavLink>
          </li>
          <li className={classNames('', { 'is-active': activeLi })}>
            <NavLink
              to="/people"
              className={getLinkClass}
              onClick={() => setActiveLi(!activeLi)}
            >
              People
            </NavLink>
          </li>
        </ul>
      </div>

      <Routes>
        <Route
          path="/"
          element={<p className="some-title">Home Page</p>}
        />
        <Route
          path="/people"
          element={(
            <>
              <p className="some-title">Peopple List</p>
              <PeoplePage people={people} />
            </>
          )}
        />
      </Routes>
    </div>
  );
};

export default App;
