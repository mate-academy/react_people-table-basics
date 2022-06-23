import './App.scss';
import {
  NavLink,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import { HomePage } from './components/HomePage';
import { PeoplePage } from './components/PeoplePage';
import { NotFoundPage } from './components/NotFoundPage';

const App = () => (
  <div className="App">
    <h1>People table</h1>

    <div>
      <NavLink
        to="/home"
        className="button"
      >
        Home Page
      </NavLink>
      <NavLink
        to="/people"
        className="button"
      >
        People Page
      </NavLink>
    </div>

    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/home" element={<Navigate to="/" replace />} />
      <Route path="/people" element={<PeoplePage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </div>
);

export default App;
