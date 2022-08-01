import './App.scss';
import 'bulma/css/bulma.min.css';

import {
  Routes,
  Route,
  Link,
  Navigate,
} from 'react-router-dom';
import { HomePage } from './components/HomePage';
import { PeoplePage } from './components/PeoplePage';

const App = () => {
  return (
    <div className="App">
      <header>
        <nav className="navbar">
          <Link className="navbar-item" to="/">Home page</Link>
          <Link className="navbar-item" to="/people">Peope page</Link>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="people" element={<PeoplePage />} />
        <Route
          path="*"
          element={<p>Page not found</p>}
        />
      </Routes>
    </div>
  );
};

export default App;
