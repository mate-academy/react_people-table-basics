import {
  Link, Routes, Route, Navigate,
} from 'react-router-dom';
import './App.scss';
import { HomePage } from './components/HomePage';
import { PeoplePage } from './components/PeoplePage';

const App = () => (
  <>
    <nav>
      <Link to="/">Home</Link>
      <Link to="/people">People</Link>
    </nav>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/people" element={<PeoplePage />} />
      <Route path="/home" element={<Navigate to="/" replace />} />
      <Route
        path="*"
        element={
          <p>Page not found</p>
        }
      />
    </Routes>
  </>
);

export default App;
