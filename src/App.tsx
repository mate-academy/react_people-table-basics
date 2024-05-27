import './App.scss';
import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import HomePage from './pages/HomePage';
import Navbar from './components/Navbar/Navbar';
import DefaultLayout from './layouts/default.layout';
import PageNotFound from './pages/PageNotFound';
import PeoplePage from './pages/PeoplePage';
import { PeopleTable } from './components/PersonTable/PersonTable';

export const App = () => (
  <Router>
    <Navbar />
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route index element={<HomePage />} />
        <Route path="home" element={<Navigate replace to="/" />} />
        <Route path="people" element={<PeoplePage />}>
          <Route index element={<PeopleTable />} />
          <Route path=":slug" element={<PeopleTable />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  </Router>
);
