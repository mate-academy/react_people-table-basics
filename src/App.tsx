import { Navigate, Route, Routes } from 'react-router-dom';

import './App.scss';
import { HomePage } from './components/HomePage';
import { PageNotFound } from './components/PageNotFound';
import { NavBar } from './components/NavBar/NavBar';
import { PeopleTable } from './components/People/PeopleTable';

export const App = () => {
  return (
    <div data-cy="app">
      <NavBar />

      <main className="section">
        <div className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route path="*" element={<PageNotFound />} />
            <Route path="/people">
              <Route index element={<PeopleTable />} />
              <Route path=":slug" element={<PeopleTable />} />
            </Route>
          </Routes>
        </div>
      </main>
    </div>
  );
};
