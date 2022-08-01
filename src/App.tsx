import './App.scss';
import { useState, useEffect } from 'react';
import {
  Routes,
  Route,
  NavLink,
  Navigate,
} from 'react-router-dom';
import { getPeople } from './api';

import { HomePage } from './components/HomePage';
import { PeoplePage } from './components/PeoplePage';
import { Person } from './types/Person';
import { NotFoundPage } from './components/NotFoundPage';

export const App = () => {
  const [people, setPeople] = useState<Person[]>([]);

  useEffect(() => {
    const loading = async () => {
      const data = await getPeople();

      setPeople(data);
    };

    loading();
  }, []);

  return (
    <div className="container box">
      <div className="App">
        <h1 className="title is-2">People table</h1>
      </div>

      <nav className="nav">
        <NavLink to="/">
          <p className="link">Home page</p>
        </NavLink>

        <NavLink to="people">
          <p className="link">People page</p>
        </NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/people" element={<PeoplePage people={people} />} />
        <Route path="home" element={<Navigate to="/" replace />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
};
