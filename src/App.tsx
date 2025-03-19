import './App.scss';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Navbar } from './components/Navbar/Navbar';
import { HomePage } from './pages/HomePage';
import { PeoplePage } from './pages/PeoplePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { useEffect, useState } from 'react';
import { Person } from './types';
import { getPeople } from './api';

export const App = () => {
  const [people, setPeople] = useState<Person[]>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(false);
    setLoading(true);

    getPeople()
      .then(setPeople)
      .catch(() => setError(true));

    setTimeout(() => {
      setLoading(false);
    }, 100);
  }, []);

  return (
    <div data-cy="app">
      <main className="section">
        <div className="container">
          <Navbar />

          <Routes>
            <Route path="/home" element={<Navigate to="/" replace={true} />} />
            <Route path="/" element={<HomePage />} />
            <Route
              path="/people/:slug?"
              element={
                <PeoplePage people={people} loading={loading} error={error} />
              }
            ></Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};
