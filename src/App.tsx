import { Routes, Route, Link } from 'react-router-dom';
import { HomePage } from './components/HomePage';
import { PeoplePage } from './components/PeoplePage';
import { NotFoundPage } from './components/NotFoundPage';
import './App.scss';

const App = () => (
  <div className="app">
    <h1 className="app__title">People table</h1>
    <nav>
      <Link
        to="/"
        className="app__link"
      >
        Home page
      </Link>
      <Link
        to="/people"
        className="app__link"
      >
        People page
      </Link>
    </nav>

    <Routes>
      <Route
        path="/"
        element={<HomePage />}
      />
      <Route
        path="people"
        element={<PeoplePage />}
      />
      <Route
        path="*"
        element={<NotFoundPage />}
      />
    </Routes>

  </div>
);

export default App;
