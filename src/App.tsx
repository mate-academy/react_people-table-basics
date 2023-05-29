import './App.scss';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Navigation } from './components/Navigation/Navigation';
import { Home } from './components/Pages/Home';
import { People } from './components/Pages/People';
import { NotFound } from './components/Pages/NotFound';

export const App = () => (
  <div data-cy="app">
    <Navigation />
    <div className="section">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="/people">
          <Route index element={<People />} />
          <Route path=":personSlug" element={<People />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  </div>
);
