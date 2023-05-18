import { Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { People } from './pages/People';
import { NotFound } from './pages/NotFound';
import './App.scss';

export const App = () => (
  <div data-cy="app">
    <Navbar />

    <main className="section">
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="home" element={<Navigate to="/" replace />} />

          <Route path="people">
            <Route index element={<People />} />
            <Route path=":slug" element={<People />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </main>
  </div>
);
