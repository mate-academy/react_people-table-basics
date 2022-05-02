import './App.scss';
import {
  Route,
  Routes,
  Navigate,
  NavLink,
} from 'react-router-dom';
import { Home } from './components/Home/Home';
import { People } from './components/People/People';
import { NotFoundPage } from './components/NotFoundPage/NotFoundPage';

const App: React.FC = () => {
  return (
    <div className="App">
      <nav>
        <div className="nav">
          <NavLink
            className="nav__link"
            style={
              ({ isActive }) => (
                isActive
                  ? {
                    color: 'brown',
                  }
                  : {}
              )
            }
            to="/"
          >
            Home page
          </NavLink>
          <NavLink
            className="nav__link"
            style={
              ({ isActive }) => (
                isActive
                  ? {
                    color: 'brown',
                  }
                  : {}
              )
            }
            to="/people"
          >
            People page
          </NavLink>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/people" element={<People />} />
        <Route path="/home" element={<Navigate replace to="/" />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
};

export default App;
