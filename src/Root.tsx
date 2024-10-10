import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import { App } from './App';
import { HomePage } from './components/pages/HomePage';
import { PeoplePage } from './components/pages/PeoplePage';
import { NotFoundPage } from './components/pages/NotFoundPage';

export const Root = () => {
  return (
    <Router>
      <Routes>
        <Route element={<App />}>
          <Route path="/:home?" element={<HomePage />} />
          <Route path="/people/:slug?" element={<PeoplePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Router>
  );
};
