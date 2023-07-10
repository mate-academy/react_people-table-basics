import { Route, Routes, Navigate } from 'react-router-dom';
import './App.scss';
import { Navigation } from './components/Navigation';
import { PeopleList } from './components/PeopleList';
import { HomePage } from './components/Pages/HomePage';
import { PageNotFound } from './components/Pages/PageNotFound';

export const App = () => (
  <div data-cy="app">
    <Navigation />

    <main className="section">
      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route
            path="/*"
            element={<PageNotFound />}
          />

          <Route path="/people">
            <Route
              index
              element={(
                <PeopleList />
              )}
            />

            <Route
              path=":personSlug"
              element={(
                <PeopleList />
              )}
            />
          </Route>
          <Route path="/home" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </main>
  </div>
);
