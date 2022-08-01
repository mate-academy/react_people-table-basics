import './App.scss';
import {
  Routes, Route, Link, Navigate,
} from 'react-router-dom';
import { People } from './components/People';

const App = () => (
  <div className="App">
    <nav>
      <Link to="/">Home</Link>
      <Link to="/people">People</Link>
    </nav>

    <Routes>
      <Route path="/" element={<h1>Home page</h1>} />
      <Route path="/people" element={<People />} />
      <Route
        path="/home"
        element={<Navigate to="/" replace />}
      />

      <Route
        path="*"
        element={
          <p>Page not found</p>
        }
      />
    </Routes>

  </div>
);

export default App;
