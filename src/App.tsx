import './App.scss';
import { Navigate, Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/HomePage/HomePage';
import { PeopleTablePage } from './pages/PeopleTablePage/PeopleTablePage';
import { PageNotFound } from './pages/PageNotFound/PageNotFound';
import { NavBar } from './components/NavBar/NavBar';

export const App = () => (
  <div data-cy="app">
    <NavBar />

    <main className="section">
      <div className="container">
        <Routes>

          <Route
            path="/"
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
        </Routes>
      </div>
    </main>
  </div>
);
