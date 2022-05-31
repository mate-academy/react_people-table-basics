import './App.scss';
import { Link, Routes, Route } from 'react-router-dom';
import PeoplePage from './components/PeoplePage/PeoplePage';
import HomePage from './components/HomePage/HomePage';
import NotFoundPage from './components/NotFoundPage/NotFoundPage';

const App = () => (
  <div className="app">
    <h1 className="app__title">People table</h1>
    <nav className="app__nav">
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
      <Route path="/" element={<HomePage />} />
      <Route path="/people" element={<PeoplePage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </div>
);

export default App;
