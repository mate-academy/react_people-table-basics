import {
  Route, Routes, NavLink, Navigate,
} from 'react-router-dom';
import './App.scss';
import { NotFoundPage } from './components/NotFoundPage/NotFoundPage';
import { PeoplePage } from './components/PeoplePage/PeoplePage';

import 'bulma/css/bulma.css';
// import '@fortawesome/fontawesome-free/css/all.css';

// interface Status {
//   isAcvtive: boolean;
// }

export const App: React.FC = () => {
//  const navigate = useNavigate();

  return (
    <div className="App">
      <nav className="navbar is-fixed-top has-background-light">
        <div className="navbar-menu">
          <div className="navbar-start">
            <NavLink to="/" className="navbar-item">Home page</NavLink>
            <NavLink to="people" className="navbar-item">People page</NavLink>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<h1>Home page</h1>} />
        <Route path="/home" element={<Navigate to="/" />} />
        <Route path="people" element={<PeoplePage />} />
        <Route
          path="*"
          element={<NotFoundPage />}
        />
      </Routes>
    </div>
  );
};
