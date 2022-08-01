import './App.scss';
import 'bulma/css/bulma.min.css';

import {
  Routes,
  Route,
  Navigate,
  NavLink,
} from 'react-router-dom';
import { HomePage } from './components/HomePage';
import { PeoplePage } from './components/PeoplePage';
import { NotFoundPage } from './components/NotFoundPage';

const App = () => {
  return (
    <div className="App">
      <header>
        <nav className="navbar">
          <NavLink className="navbar-item" to="/">Home page</NavLink>
          <NavLink className="navbar-item" to="/people">Peope page</NavLink>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="people" element={<PeoplePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
};

export default App;
