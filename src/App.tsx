import './App.scss';
import { Navigate, Route, Routes } from 'react-router-dom';
import { HomePage } from './components/Loader/pages/HomePage';
import { PeoplePage } from './components/Loader/pages/PeoplePage';
import { PageNotFound } from './components/Loader/pages/PageNotFound';
import { NavBar } from './components/Loader/NavBar/NavBar';

export const App = () => (
  <div data-cy="app">
    <NavBar />
    <main className="section">
      <div className="container">
        <Routes>
          <Route path="*" element={<PageNotFound />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/people" element={<PeoplePage />} />
          <Route path=":slug" element={<PeoplePage />} />
          <Route />
          <Route path="/home" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </main>
  </div>
);
