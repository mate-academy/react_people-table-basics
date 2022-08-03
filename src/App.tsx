import {
  Routes, Route, NavLink, Navigate,
} from 'react-router-dom';
import { HomePage } from './components/HomePage';
import { NotFoundPage } from './components/NotFoundPage';
import { PeoplePage } from './components/PeoplePage';
import 'bulma/css/bulma.min.css';
import './App.scss';

const App = () => (
  <div className="App">

    <header>
      <nav className="navbar">
        <NavLink className="navbar-item" to="/">Home page</NavLink>
        <NavLink className="navbar-item" to="/people">People page</NavLink>
      </nav>
    </header>

    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/home" element={<Navigate to="/" replace />} />
      <Route path="/people" element={<PeoplePage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>

  </div>
);

export default App;
