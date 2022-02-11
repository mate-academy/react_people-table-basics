import { FC } from 'react';
import {
  Routes,
  Route,
  Link,
  Navigate,
} from 'react-router-dom';

import './App.scss';
import { PeopleTable } from './components/PeopleTable';

const App: FC = () => (
  <div className="App">
    <header>
      <nav className="App__nav nav box">
        <ul className="nav__list">
          <li className="nav__item">
            <Link to="/">Home</Link>
          </li>

          <li className="nav__item">
            <Link to="/people">People</Link>
          </li>
        </ul>
      </nav>
    </header>

    <Routes>
      <Route
        path="/"
        element={(
          <h2 className="title is-2 has-text-centered">
            Home page
          </h2>
        )}
      />

      <Route
        path="/people"
        element={(
          <>
            <h2 className="title is-2 has-text-centered">People table</h2>
            <PeopleTable />
          </>
        )}
      />

      <Route
        path="/home"
        element={<Navigate to="/" replace />}
      />

      <Route
        path="*"
        element={(
          <h2 className="title is-2 has-text-centered">
            <h2>Page not found</h2>
          </h2>
        )}
      />
    </Routes>
  </div>
);

export default App;
