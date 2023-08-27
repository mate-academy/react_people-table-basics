import { Route, HashRouter as Router, Routes } from 'react-router-dom';
import { App } from './App';
import { HomePage } from './components/HomePage/HomePage';
import { PeoplePage } from './components/PeoplePage/PeoplePage';

export const Root = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path="people">
          <Route path=":personSlug?" element={(<PeoplePage />)} />
        </Route>
        <Route
          path="*"
          element={<h1 className="title">Page not found</h1>}
        />
        <Route />
      </Route>
    </Routes>
  </Router>
);
