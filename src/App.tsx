import {
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';

import './App.scss';
import { TodosPage } from './components/TodosPage/TodosPage';
import { Navigation } from './components/Navigation/Navigation';

export const App = () => {
  return (
    <div data-cy="app">
      <Navigation />

      <Routes>
        <Route
          path="*"
          element={
            <h1 className="title">Page not found</h1>
          }
        />
        <Route
          path="/home"
          element={
            <Navigate to="/" replace />
          }
        />
        <Route
          path="/"
          element={
            <h1 className="title">Home Page</h1>
          }
        />
        <Route
          path="/people"
          element={(
            <main className="section">
              <TodosPage />
            </main>
          )}
        >
          <Route
            index
            element={(
              <main className="section">
                <TodosPage />
              </main>
            )}
          />
          <Route
            path="/people/:activePerson"
            element={(
              <main className="section">
                <TodosPage />
              </main>
            )}
          />
        </Route>
      </Routes>
    </div>
  );
};
