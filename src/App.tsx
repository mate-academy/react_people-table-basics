import {
  Link, Navigate, Route, Routes,
} from 'react-router-dom';
import { PeoplePage } from './PeoplePage';

export const App = () => (
  <div className="App">
    <nav>
      <Link to="/">Home</Link>
      {' '}
      <Link to="people">People</Link>
    </nav>
    <Routes>
      <Route path="/" element={<h1>Home Page</h1>} />
      <Route path="home" element={<Navigate to="/" replace />} />
      <Route path="people" element={<PeoplePage />} />
      <Route path="*" element={<h1>Page not found</h1>} />
    </Routes>
  </div>
);
