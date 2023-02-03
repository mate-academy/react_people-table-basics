import { Routes, Route, Navigate } from 'react-router-dom';
import './App.scss';
import { Navbar } from './components/Navbar';
import { PageNotFound } from './Pages/PageNotFound';
import { HomePage } from './Pages/HomePage';
import { PeoplePage } from './Pages/PeoplePage';

export const App = () => (
  <div data-cy="app">
    <Navbar />
    <main className="section">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="home" element={<Navigate to="/" replace />} />
        <Route path="/people" element={<PeoplePage />}>
          <Route path=":slug" element={<PeoplePage />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </main>
  </div>
);
