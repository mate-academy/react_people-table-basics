import { Route, Routes, Navigate } from 'react-router-dom';
import './App.scss';
import { PeoplePage } from './pages/PeoplePage';
import { HomePage } from './pages/HomePage';
import { MainNav } from './components/MainNav/MainNav';

export const App = () => (
  <div data-cy="app">
    <MainNav />

    <main className="section">
      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="home" element={<Navigate to="/" replace />} />
          <Route path="*" element={<h1 className="title">Page not found</h1>} />

          <Route path="people">
            <Route path=":slug" element={<PeoplePage />} />
            <Route index element={<PeoplePage />} />
          </Route>

        </Routes>
      </div>
    </main>
  </div>
);
