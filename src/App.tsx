import './App.scss';
import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import PeoplePage from './pages/PeoplePage';
import PageNotFound from './pages/PageNotFound';

export const App = () => (
  <div data-cy="app">
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="people" element={<PeoplePage />}>
          <Route path=":slug" element={<PeoplePage />} />
        </Route>
        <Route path="home" element={<Navigate to="/" replace={true} />} />
        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  </div>
);
