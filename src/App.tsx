import './App.scss';
import { Home } from './components/Home';
import { People } from './components/People';
import { Navigation } from './components/Navigation';
import { Navigate, Route, Routes } from 'react-router-dom';

export const App = () => (
  <div data-cy="app">
    <div className="section">
      <Navigation />
      <Routes>
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="/" element={<Home />} />
        <Route path="/people" element={<People />}>
          <Route path=":personSlug" element={<People />} />
        </Route>
        <Route path="*" element={<h1 className="title">Page not found</h1>} />
      </Routes>
    </div>
  </div>
);
