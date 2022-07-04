import { Link, Route, Routes } from 'react-router-dom';
import 'bulma/css/bulma.css';

import './App.scss';
import { PeoplePage } from './components/PeoplePage/PeoplePage';

const App = () => (
  <div className="App">
    <div className="header">
      <h1>People</h1>
      <nav className="navbar">
        <Link
          className="navbar-item navbar-link"
          to="/"
        >
          Home page
        </Link>
        <Link
          className="navbar-item navbar-link"
          to="/people"
        >
          People page
        </Link>
      </nav>
    </div>

    <Routes>
      <Route path="/" element={<h1>Home page</h1>} />
      <Route path="people" element={<PeoplePage />} />

      <Route path="*" element={<h1>Page not found</h1>} />
    </Routes>
  </div>
);

export default App;
