import { Navigate, Route, Routes } from 'react-router-dom';

import './App.scss';
import { Navigation } from './components/Loader/pages/Navigation';
import { PeopleList } from './components/Loader/pages/PeopleList';

export const App = () => {
  return (
    <div data-cy="app">
      <Navigation />

      <main className="section">
        <div className="container">
          <Routes>
            <Route
              path="*"
              element={<h1 className="title">Page not found</h1>}
            />
            <Route path="/" element={<h1 className="title">Home Page</h1>} />
            <Route path="home" element={<Navigate to="/" replace />} />
            <Route path="/people">
              <Route
                index
                element={(
                  <PeopleList />
                )}
              />
              <Route
                path=":slug"
                element={(
                  <PeopleList />
                )}
              />
            </Route>
          </Routes>
        </div>
      </main>
    </div>
  );
};
