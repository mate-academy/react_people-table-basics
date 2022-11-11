import { Navigate, Route, Routes } from 'react-router-dom';
import './App.scss';
import { People } from './components/People';
import { HomePage } from './components/HomePage';
import { NotFoundPage } from './components/NotFoundPage';
import { Navbar } from './components/Navbar';

export const App = () => (
  <div data-cy="app">
    <Navbar />
    <Routes>
      <Route
        path="/"
        element={(<HomePage />)}
      />
      <Route
        path="home"
        element={<Navigate to="/" replace />}
      />
      <Route path="people">
        <Route
          index
          element={(<People />)}
        />
        <Route
          path=":slug"
          element={(<People />)}
        />
      </Route>
      <Route
        path="*"
        element={(<NotFoundPage />)}
      />
    </Routes>
  </div>
);
