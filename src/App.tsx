import { Navigate, Route, Routes } from 'react-router-dom';

import './App.scss';
import { NavBar } from './NavBar';
import { PeopleTable } from './PeopleTable';
import { HomePage } from './HomePage';
import { PageNotFound } from './PageNotFound';

export const App = () => {
  return (
    <div data-cy="app">
      <NavBar />

      <main className="section">
        <div className="container">
          <Routes>
            <Route path="/">
              <Route index element={<HomePage />} />
              <Route
                path="home"
                element={<Navigate to=".." replace />}
              />
              <Route path="people">
                <Route path=":slug?" element={<PeopleTable />} />
              </Route>
            </Route>
            <Route path="*" element={<PageNotFound />} />
          </Routes>

        </div>
      </main>
    </div>
  );
};
