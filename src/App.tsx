import {
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';

import './App.scss';
import { Homepage } from './components/Homepage';
import { NavBar } from './components/NavBar';
import { PageError } from './components/PageError';
import { People } from './components/People';

export const App = () => {
  return (
    <div data-cy="app">
      <NavBar />

      <main className="section">
        <Routes>
          <Route path="*" element={<PageError />} />

          <Route path="/" element={<Homepage />} />
          <Route path="home" element={<Navigate to="/" replace />} />

          <Route path="people">
            <Route index element={<People />} />
            <Route path=":slug" element={<People />} />
          </Route>
        </Routes>
      </main>
    </div>
  );
};
