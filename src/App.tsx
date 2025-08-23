import React from 'react';
import { Routes, Route, Navigate, NavLink } from 'react-router-dom';
import { PeoplePage } from './pages/PeoplePage';
import { NotFoundPage } from './pages/NotFoundPage';

const App: React.FC = () => {
  return (
    <>
      <nav
        data-cy="nav"
        className="flex justify-center bg-gray-300 p-4 shadow-md
                   rounded-b-lg gap-4"
      >
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `px-4 py-2 rounded-lg transition-colors ${
              isActive ? 'has-background-grey-lighter' : ''
            }`
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/people"
          className={({ isActive }) =>
            `px-4 py-2 rounded-lg transition-colors ${
              isActive ? 'has-background-grey-lighter' : ''
            }`
          }
        >
          People
        </NavLink>
      </nav>

      <Routes>
        <Route
          path="/"
          element={
            <div data-cy="app" className="p-8">
              <h1 className="title">Home Page</h1>
            </div>
          }
        />

        <Route path="/people" element={<PeoplePage />} />
        <Route path="/people/:slug" element={<PeoplePage />} />

        {/* redirect /home -> / */}
        <Route path="/home" element={<Navigate to="/" replace />} />

        {/* catch-all */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
};

export default App;
