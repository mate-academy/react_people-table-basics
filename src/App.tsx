import './App.scss';
import { Navigate, Route, Routes } from 'react-router-dom';
import { NotFoundPage } from './components/NotFoundPage/NotFoundPage';
import { PeopleTable } from './components/PeopleTable/PeopleTable';
import { Navigation } from './components/Navigation/Navigation';
import { HomePage } from './components/HomePage/HomePage';

export const App = () => {
  return (
    <div data-cy="app">
      <Navigation />

      <main className="section">
        <div className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route path="people">
              <Route index element={<PeopleTable />} />
              <Route path=":slug" element={<PeopleTable />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};
