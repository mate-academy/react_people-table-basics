import { Navigate, Route, Routes } from 'react-router-dom';
import './App.scss';
import { HomePage } from './components/HomePage';
import { Navbar } from './components/Navbar';
import { NotFound } from './components/NotFound';
import { PeoplePage } from './components/PeoplePage';

export const App = () => (
  <div data-cy="app">
    <Navbar />
    <main className="section">
      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="/people/slug?" element={<PeoplePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </main>
  </div>
);
