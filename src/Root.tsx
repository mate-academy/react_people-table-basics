import { Route, HashRouter as Router, Routes } from 'react-router-dom';
import { App } from './App';
import { HomePage } from './pages/HomePage';
import { PeoplePage } from './pages/PeoplePage';

export const Root = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="home" element={<HomePage />} />
        <Route path="people/:userSlug" element={<PeoplePage />} />
        <Route
          path="*"
          element={
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          }
        />
      </Route>
    </Routes>
  </Router>
);
