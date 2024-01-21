import { Route, Routes } from 'react-router-dom';
import './App.scss';
import { Nav } from './components/Nav';
import { PeopleTable } from './components/PeopleTable/PeopleTable';
import { PageNotFound } from './components/PageNotFound';
import { Home } from './components/Home';

export const App = () => (
  <div data-cy="app">
    <Nav />
    <main className="section">
      <div className="container">
        <Routes>
          <Route
            path="/"
            element={(<Home />)}
          />

          <Route
            path="/home"
            element={(<Home />)}
          />

          <Route path="/people">
            <Route
              index
              element={(<PeopleTable />)}
            />
            <Route
              path=":personSlug"
              element={(<PeopleTable />)}
            />
          </Route>

          <Route
            path="*"
            element={(<PageNotFound />)}
          />
        </Routes>
      </div>
    </main>
  </div>
);
