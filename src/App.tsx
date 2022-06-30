import './App.scss';
import { NavLink, Routes, Route } from 'react-router-dom';
import { HomePage } from './components/HomePage';
import { PeoplePage } from './components/PeoplePage';
import { NotFoundPage } from './components/NotFoundPage';

const App = () => (
  <div className="App">
    <h1 className="title">People table</h1>
    <div>
      <NavLink
        to="/"
        className={({ isActive }) => (
          isActive ? 'activeLink' : undefined
        )}
      >
        Home
      </NavLink>
      {' '}
      <NavLink
        to="/people"
        className={({ isActive }) => (
          isActive ? 'activeLink' : undefined
        )}
      >
        People
      </NavLink>
    </div>

    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/people" element={<PeoplePage />} />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </div>
);

export default App;
