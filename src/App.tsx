import {
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';

import './App.scss';
import { Navigation } from './components/Navigation';
import { HomePage } from './components/HomePage';
import { PeopleList } from './components/PeopleList';
import { NotFoundPage } from './components/NotFoundPage';

const App = () => (
  <div className="container is-max-desktop">
    <div>
      <Navigation />
    </div>
    <section className="section">
      <div className="container">
        <div className="columns">
          <div className="column">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/people" element={<PeopleList />} />
              <Route
                path="*"
                element={<NotFoundPage />}
              />
              <Route
                path="/home"
                element={<Navigate to="/" />}
              />
            </Routes>
          </div>
        </div>
      </div>
    </section>
  </div>
);

export default App;
