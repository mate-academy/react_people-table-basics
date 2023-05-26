import { Routes, Route, Navigate } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { Home } from './pages/Home';
import { PeopleTable } from './pages/PeopleTable';
import { NotFound } from './pages/NotFound';
import './App.scss';

export const App = () => (
  <div data-cy="app">
    <Navigation />

    <main className="section">
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/home" element={<Navigate to="/" replace />} />

          <Route path="/people">
            <Route index element={<PeopleTable />} />
            <Route path=":slug" element={<PeopleTable />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </main>
  </div>
);
