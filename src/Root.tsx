import { HashRouter as Router } from 'react-router-dom';
import { Navigate, Route, Routes } from 'react-router-dom';
import { App } from './App';
import { PeopleProvider } from './store/PeopleContext';
import { PeoplePage } from './pages/PeoplePage';
import { HomePage } from './pages/HomePage';

export const Root = () => (
  <Router>
    <PeopleProvider>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="*" element={<h1 className="title">Page not found</h1>} />
          <Route index element={<HomePage />} />
          <Route path="home" element={<Navigate to="/" />} />

          <Route path="people">
            <Route index element={<PeoplePage />} />
            <Route path=":personSlug" element={<PeoplePage />} />
          </Route>
        </Route>
      </Routes>
    </PeopleProvider>
  </Router>
);
