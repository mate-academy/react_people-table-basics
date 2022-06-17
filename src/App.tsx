import './App.scss';
import {
  NavLink,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { PeoplePage } from './pages/PeoplePage';
import { NotFoundPage } from './pages/NotFoundPage';

const App = () => (
  <div className="App">
    <div className="nav">
      <NavLink to="/">
        Home
      </NavLink>
      <NavLink to="/people">
        People
      </NavLink>
    </div>

    <div className="content">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="people" element={<PeoplePage />} />
        <Route path="/home" element={<Navigate to="/" />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  </div>
);

export default App;
