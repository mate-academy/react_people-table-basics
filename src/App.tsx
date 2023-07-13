import './App.scss';
import { Navigate, Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/HomePage/HomePage';
import { PeopleTablePage } from './pages/PeopleTablePage/PeopleTablePage';
import { PageNotFound } from './pages/PageNotFound/PageNotFound';
import { Layout } from './components/Layout/Layout';

export const App = () => (
  <Routes>

    <Route
      path="/"
      element={
        <Layout />
      }
    >
      <Route
        index
        element={
          <HomePage />
        }
      />

      <Route
        path="/home"
        element={
          <Navigate to="/" replace />
        }
      />

      <Route path="people">
        <Route index element={<PeopleTablePage />} />

        <Route path=":slug" element={<PeopleTablePage />} />
      </Route>

      <Route path="*" element={<PageNotFound />} />
    </Route>
  </Routes>
);
