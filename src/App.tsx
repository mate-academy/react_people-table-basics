import { useState } from 'react';
import { NavLink, Route, Routes } from 'react-router-dom';
import './App.scss';
import { HomePage } from './components/HomePage';
import { PeoplePage } from './components/PeoplePage';
import { PeopleTable } from './components/PeopleTable';
import { People } from './types/People';

interface Status {
  isActive: boolean,
}

const App = () => {
  const [people, setPeople] = useState<People[]>([]);

  const getLinkClass = (status: Status) => {
    return status.isActive ? 'nav__link is-active' : 'nav__link';
  };

  return (
    <div className="App">
      <nav className="nav">
        <NavLink
          to="/"
          className={getLinkClass}
        >
          Home page
        </NavLink>

        <NavLink
          to="/people"
          className={getLinkClass}
        >
          People page
        </NavLink>
      </nav>

      <main>
        <Routes>
          <Route
            path="/"
            element={(
              <HomePage />
            )}
          />

          <Route
            path="people"
            element={(
              <>
                <PeoplePage loadPeople={setPeople} />
                <PeopleTable people={people} />
              </>
            )}
          />

          <Route
            path="*"
            element={(
              <h2>Page not found</h2>
            )}
          />
        </Routes>
      </main>
    </div>
  );
};

export default App;
