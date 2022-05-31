import './App.scss';
import { Link, Routes, Route } from 'react-router-dom';
import PeoplePage from './components/PeoplePage/PeoplePage';
import HomePage from './components/HomePage/HomePage';
import NotFoundPage from './components/NotFoundPage/NotFoundPage';

const App = () => (
  <div className="App">
    <h1>People table</h1>
    <nav>
      <Link to="/">Home page</Link>
      <Link to="/people">People page</Link>
    </nav>

    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/people" element={<PeoplePage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </div>
);

export default App;
