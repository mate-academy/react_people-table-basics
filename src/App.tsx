import { Route, Routes } from 'react-router-dom';

import { Navbar } from './components/Navbar/Navbar';
import { HomePage } from './components/HomePage/HomePage';
import { PeopleTable } from './components/PeopleTable/PeopleTable';
import { NotFounfPage } from './components/NotFoundPage/NotFoundPage';

import './App.scss';

export const App = () => {
  return (
    <div data-cy="app">
      <Navbar />

      <main className="section">
        <div className="container">
          <Routes>
            <Route
              path="/"
              element={<HomePage />}
            />
            <Route
              path="/people"
              element={<PeopleTable />}
            />
            <Route
              path="*"
              element={<NotFounfPage />}
            />
          </Routes>
        </div>
      </main>
    </div>
  );
};
