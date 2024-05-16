import './App.scss';
import { NavBar } from './components/NavigationBar';
import { Route, Routes, Navigate } from 'react-router-dom';
import { Home } from './components/Home';
import { PeopleNotFound } from './components/PeopleNotFound';
import { PeoplePage } from './components/PeoplePage';

export const App = () => {
  return (
    <div data-cy="app">
      <NavBar />

      <main className="section">
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route path="/people/:selected?" element={<PeoplePage />} />

            <Route path="*" element={<PeopleNotFound />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};
