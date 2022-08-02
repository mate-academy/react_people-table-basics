import './App.scss';
import {
  Navigate,
  NavLink,
  Route,
  Routes,
} from 'react-router-dom';
import 'bulma/css/bulma.css';

import { PeopleTable } from './components/PeopleTable/PeopleTable';
import { HomePage } from './components/HomePage/HomePage';
import { NotFoundPage } from './components/NotFoundPage/NotFoundPage';

export const App:React.FC = () => {
  const activeLink = ({ isActive }: { isActive: boolean }) => (isActive
    ? 'title is-1 has-text-primary'
    : 'title is-1 has-text-white');

  return (
    <div className="App">
      <header className="App__header ">
        <nav className="App__nav">
          <NavLink
            className={activeLink}
            to="/"
          >
            HomePage
          </NavLink>
          <NavLink
            className={activeLink}
            to="/people"
          >
            PeoplePage
          </NavLink>
        </nav>
      </header>

      <Routes>
        <Route
          path="/"
          element={<HomePage />}
        />
        <Route
          path="people"
          element={<PeopleTable />}
        />
        <Route
          path="/home"
          element={<Navigate to="/" />}
        />
        <Route
          path="*"
          element={<NotFoundPage />}
        />
      </Routes>
    </div>
  );
};
