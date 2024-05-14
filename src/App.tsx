import './App.scss';
import { NavBar } from './components/NavBar';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useState } from 'react';
import { Home } from './components/Home';
import { PeopleNotFound } from './components/PeopleNotFound';
import { PeoplePage } from './components/PeoplePage';

export const App = () => {
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <div data-cy="app">
      <NavBar />

      <main className="section">
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route
              path="/people"
              element={<PeoplePage loading={loading} setLoading={setLoading} />}
            />

            <Route path="*" element={<PeopleNotFound />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};
