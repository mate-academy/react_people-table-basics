import './App.scss';
import {
  Routes, Route, Navigate, Link,
} from 'react-router-dom';
import { PeoplePage } from './PeoplePage';
import { NotFoundPage } from './NotFoundPage';
import { Home } from './Home';

export const App = () => (
  <>
    <header className="Header">
      <nav className="Nav">
        <Link to="/home" className="Nav Nav__link">Home</Link>
        &nbsp;
        <Link to="/people" className="Nav Nav__link">People</Link>
        &nbsp;
      </nav>
    </header>

    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/home"
          element={<Navigate to="/" replace />}
        />
        <Route path="/people" element={<PeoplePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  </>

);
