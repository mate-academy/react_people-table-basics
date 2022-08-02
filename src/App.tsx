import './App.scss';
import {
  HashRouter as Router, Navigate, NavLink, Route, Routes,
} from 'react-router-dom';
import { PeoplePage } from './components/PeoplePage';

export const App = () => {
  return (
    <Router>
      <div className="App">
        <nav>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/people">People</NavLink>
        </nav>

        <Routes>
          <Route path="/" element={<h1>Homepage</h1>} />
          <Route path="/people" element={<PeoplePage />} />
          <Route path="/home" element={<Navigate to="/" />} />
          <Route path="*" element={<h1>Page not found</h1>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
