import 'bulma/css/bulma.css';

import { Routes, Route, NavLink } from 'react-router-dom';
import { PeoplePage } from './components/PeoplePage';
import { HomePage } from './components/HomePage';
import { NotFoundPage } from './components/NotFoundPage';

export const App = () => {
  const getActiveStyle = (status: Status): React.CSSProperties => {
    return status.isActive ? { textDecoration: 'underline' } : {};
  };

  return (
    <div className="App">
      <nav className="navbar is-primary">
        <NavLink
          className="navbar-item"
          to="home"
          style={getActiveStyle}
        >
          Home
        </NavLink>

        <NavLink
          className="navbar-item"
          to="people"
          style={getActiveStyle}
        >
          People
        </NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="home" element={<HomePage />} />
        <Route path="people" element={<PeoplePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
};
