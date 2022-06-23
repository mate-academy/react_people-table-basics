import {
  Link,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import './App.scss';
import { HomePage } from './components/homePage/HomePage';
import { PeoplePage } from './components/peoplePage/peoplePage';

const App = () => (
  <div className="App container">
    <header>
      <nav>
        <Link to="/">HomePage</Link>
        {' '}
        <Link to="/people">PeoplePage</Link>
      </nav>
    </header>

    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/people" element={<PeoplePage />} />
      <Route path="/home" element={<Navigate to="/" replace />} />
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
