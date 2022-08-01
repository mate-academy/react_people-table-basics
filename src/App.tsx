import './App.scss';
import { useEffect, useState } from 'react';
import { NavLink, Route, Routes } from 'react-router-dom';
import 'bulma/css/bulma.css';

import { getPeople } from './api';
import { PeopleTable } from './components/PeopleTable';

const App:React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);

  useEffect(() => {
    getPeople().then(data => setPeople(data));
  }, []);

  return (
    <div className="App">
      <header className="App__header ">
        <nav className="App__nav">
          <NavLink
            className={({ isActive }) => (isActive
              ? 'title is-1 has-text-primary'
              : 'title is-1 has-text-white')}
            to="/"
          >
            HomePage
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive
              ? 'title is-1 has-text-primary'
              : 'title is-1 has-text-white')}
            to="/people"
          >
            PeoplePage
          </NavLink>
        </nav>
      </header>

      <Routes>
        <Route
          path="/"
          element={
            <h1 className="title is-3 has-text-white">Home Page</h1>
          }
        />
        <Route
          path="people"
          element={<PeopleTable people={people} />}
        />
        <Route
          path="*"
          element={
            <h1 className="title is-3 has-text-white">Page not found</h1>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
