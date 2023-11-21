import { Navigate, Route, Routes } from 'react-router-dom';
import './App.scss';
import { Navigation } from './components/Navigation';
import { HomePage } from './components/HomePage';
import { PeoplePage } from './components/PeopleTable';
import { PageNotFound } from './components/PageNotFound/PageNotFound';

export const App = () => (
  <div data-cy="app">
    <Navigation />
    <main className="section">
      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="people" element={<PeoplePage />}>
            <Route path=":selectedPersonId" />
          </Route>
          <Route path="/page-not-found" element={<PageNotFound />} />
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </main>
  </div>
);
