import { Navigate, Route, Routes } from 'react-router-dom';
import './App.scss';
import { Home } from './components/Home';
import { Navbar } from './components/Navbar';
import { NotFoundPage } from './components/NotFoundPage/NotFoundPage';
import { People } from './components/People';

export const App = () => (
  <div data-cy="app">
    <Navbar />

    <main className="section">
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="home" element={<Navigate to="/" replace />} />
          <Route path="/people" element={<People />} />
          <Route path="/people/:personId" element={<People />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </main>
  </div>
);
