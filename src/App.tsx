import './App.scss';
import {
  Routes,
  Route,
  Link,
  Navigate,
} from 'react-router-dom';

import { PeoplePage } from './components/PeoplePage';

const App = () => (
  <div className="App">
    <header>
      <nav>
        <Link to="/">Home page</Link>
        <br />
        <Link to="/people">People page</Link>
      </nav>
    </header>
    <Routes>
      <Route path="/" element={<h2>Home page</h2>} />
      <Route path="people" element={<PeoplePage />} />
      <Route path="home" element={<Navigate to="/" replace />} />

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
