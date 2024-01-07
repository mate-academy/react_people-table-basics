import {
  Navigate,
  Route,
  Routes,
  HashRouter as Router,
} from 'react-router-dom';
import { App } from './App';
import './App.scss';
import { Table } from './components/Loader/Table';
import { PageNotFound } from './components/PageNotFound';
import { HomeTitle } from './components/HomeTitle';

export const Root = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomeTitle />} />
        <Route path="home" element={<Navigate replace to="/" />} />
        <Route path="people" element={<Table />}>
          <Route path=":personSlug?" element={<Table />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  </Router>
);
