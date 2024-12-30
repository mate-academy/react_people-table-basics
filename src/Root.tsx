import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { App } from './App';
import { HomePage } from './components/HomePage';
import { PeoplePage } from './components/PeoplePage';
import { NotFoundPage } from './components/NotFoundPage';
import { Paths } from './utils/Paths';

export const Root = () => (
  <Router>
    <Routes>
      <Route path={Paths.ROOT} element={<App />}>
        <Route index element={<HomePage />} />

        <Route path={Paths.PEOPLE}>
          <Route index element={<PeoplePage />} />
          <Route path={Paths.PERSON_DETAILS} element={<PeoplePage />} />
        </Route>

        <Route path={Paths.NOT_FOUND} element={<NotFoundPage />} />
      </Route>
    </Routes>
    <App />
  </Router>
);
