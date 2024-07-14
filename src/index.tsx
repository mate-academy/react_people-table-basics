import { createRoot } from 'react-dom/client';
import {
  Navigate,
  Route,
  HashRouter as Router,
  Routes,
} from 'react-router-dom';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { App } from './App';
import { HomePage } from './Pages/Page-home/PageHome';
import { PeoplePage } from './Pages/Page-people/PeoplePage';
import { PageNotFound } from './Pages/Page-not-found/PageNotFound';

createRoot(document.getElementById('root') as HTMLDivElement).render(
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />}></Route>
        <Route path="home" element={<Navigate replace to="/" />}></Route>
        <Route path="people" element={<PeoplePage />}>
          <Route path=":peopleSlug?" element={<PeoplePage />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  </Router>,
);
