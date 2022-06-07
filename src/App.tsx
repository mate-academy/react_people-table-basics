import './App.scss';
import { Link, Routes, Route } from 'react-router-dom';
import { HomePage } from './Components/HomePage/HomePage';
import { PeoplePage } from './Components/PeoplePage/PeoplePage';
import { PageNotFound } from './Components/PageNotFound/PageNotFound';

const App = () => (
  <div className="App text-center text-light p-2 m-2">
    <h1>People table</h1>
    <nav className="navbar">
      <Link
        to="/"
        className="nav-link text-light p-3 m-4 bg-dark rounded"
      >
        Home Page
      </Link>
      <Link
        to="/people"
        className="nav-link text-light p-3 m-4 bg-dark rounded"
      >
        People Page
      </Link>
    </nav>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/people" element={<PeoplePage />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  </div>
);

export default App;
