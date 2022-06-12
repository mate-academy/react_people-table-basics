import './App.scss';
import {
  Routes,
  Route,
  BrowserRouter as Router,
  Link,
  Navigate,
} from 'react-router-dom';
import HomePage from './components/HomePage';
import PeoplePage from './components/PeoplePage';
import ErrorPage from './components/ErrorPage';

const App = () => {
  return (
    <Router>
      <header className="header">
        <h1 className="header__title">People table</h1>
        <nav>
          <Link to="/home">
            <button type="button" className="header__btn">
              Home Page
            </button>
          </Link>
          <Link to="/people">
            <button type="button" className="header__btn">
              People Page
            </button>
          </Link>
        </nav>
      </header>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/people" element={<PeoplePage />} />
        <Route path="/home" element={<Navigate to="/" />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
};

export default App;
