import ReactDOM from 'react-dom';
import {
  HashRouter,
  Outlet,
  Route,
  Routes,
} from 'react-router-dom';

import App from './App';
import { NotFoundPage } from './components/NotFoundPage/NotFoundPage';
import { PeopleTable } from './components/PeopleTable/PeopleTable';
import { HomePage } from './components/HomePage/HomePage';

ReactDOM.render(
  <HashRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="home" element={<HomePage />} />

        <Route path="people" element={<PeopleTable />}>
          <Route path=":slug" element={<Outlet />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  </HashRouter>,
  document.getElementById('root'),
);
