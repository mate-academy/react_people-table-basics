import './App.scss';
import {
  Routes, Route, Link, Navigate,
} from 'react-router-dom';
import PeoplePage from './components/PeoplePage/PeoplePage';

const App:React.FC = () => {
  return (
    <div className="App subtitle is-3">
      <nav className="nav">
        <Link className="button is-link" to="/">Home page</Link>
        <Link className="button is-info" to="/people">People page</Link>
      </nav>
      <Routes>
        <Route path="/" element={<h1>Home page</h1>} />
        <Route path="/home" element={<Navigate to="/" />} />
        <Route path="/people" element={<PeoplePage />} />

        <Route
          path="*"
          element={
            <p>Page not found</p>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
