import React, { useEffect, useState } from 'react';

import './App.scss';
import { NavLink, Route, Routes } from 'react-router-dom';
import { Person, Status } from './type/type';
import { PeopleTable } from './components/PeopleTable';
import { getPeople } from './api/api';
import 'bulma';

const App: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const getLinkStyle = (status: Status): React.CSSProperties => {
    return status.isActive ? { backgroundColor: '#ccc' } : {};
  };

  useEffect(() => {
    getPeople().then(person => setPeople(person));
  }, []);

  return (
    <div className="App">
      <nav className="nav">
        <NavLink
          to="/"
          style={getLinkStyle}
          className="nav__page"
        >
          Home
        </NavLink>

        <NavLink
          to="people"
          style={getLinkStyle}
          className="nav__page"
        >
          People
        </NavLink>
      </nav>

      <Routes>
        <Route
          path="/"
          element={(
            <p className="nav__text">Home page</p>
          )}
        />

        <Route
          path="/people"
          element={(
            <>
              <p className="nav__text">People Page</p>
              <PeopleTable people={people} />
            </>
          )}
        />

        <Route
          path="*"
          element={(
            <p className="nav__text">Not Found Page</p>
          )}
        />
      </Routes>
    </div>
  );
};

export default App;
