import { Navigate, Route, HashRouter as Router, Routes } from 'react-router-dom';
import { App } from './App';
import { Home } from './components/Home';
import { PeoplePage } from './components/PeoplePage';
import { NotFoundPage } from './components/NotFoundPage';

export const Root = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="home" element={<Navigate to="/" />} />
        <Route path="people" element={<PeoplePage />} />
        <Route path="*" element={<NotFoundPage />} />

      </Route>
    </Routes>
    <App />
  </Router>
);
