import 'bulma';
import {
  Link,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';

import './App.scss';
import { HomePage } from './Components/HomePage/HomePage';
import { PeoplePage } from './Components/PeoplePage/PeoplePage';

const App: React.FC = () => (
  <div className="App">
    <div className="container">
      <nav className="navbar is-white">
        <div className="navbar-brand">
          <Link className="navbar-item" to="/">
            <img src="https://bulma.io/images/bulma-logo.png" alt="Bulma: a modern CSS framework based on Flexbox" width="112" height="28" />
          </Link>
          <Link className="navbar-item is-tab" to="/home">
            Home
          </Link>
          <Link className="navbar-item is-tab" to="/people-page">
            People page
          </Link>
        </div>
      </nav>
    </div>

    <section className="section">
      <div className="container">
        <h1 className="title">Mate academy</h1>

        <div className="columns">
          <div className="column">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/people-page" element={<PeoplePage />} />
              <Route
                path="*"
                element={
                  <p>Page not found</p>
                }
              />
              <Route path="/home" element={<Navigate to="/" />} />
            </Routes>
          </div>
        </div>
      </div>
    </section>

  </div>
);

export default App;
