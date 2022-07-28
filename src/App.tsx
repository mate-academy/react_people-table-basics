import classNames from 'classnames';
import {
  Navigate,
  NavLink,
  Route,
  Routes,
} from 'react-router-dom';
import './App.scss';
import { HomePage } from './components/homePage';
import { PeoplePage } from './components/peoplePage';

const App = () => (
  <div className="App">
    <header className="navbar">
      <nav className="navbar-menu">
        <NavLink
          className={(navData) => (classNames(
            'navbar-item',
            {
              'is-active': navData.isActive,
            },
          ))}
          to="/"
        >
          Home page
        </NavLink>
        <NavLink
          className={(navData) => (classNames(
            'navbar-item',
            {
              'is-active': navData.isActive,
            },
          ))}
          to="/people"
        >
          Peope page
        </NavLink>
      </nav>
    </header>

    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="home" element={<Navigate to="/" />} />
      <Route path="/people" element={<PeoplePage />} />

      <Route path="*" element={<p>Page not found</p>} />
    </Routes>
  </div>
);

export default App;
