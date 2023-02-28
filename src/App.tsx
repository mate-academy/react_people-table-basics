import './App.scss';
import { Navigate, Route, Routes } from 'react-router-dom';
import { PeoplePage } from './Pages/PeoplePage';
import { NavBar } from './components/NavBar';
import { PageNotFound } from './Pages/PageNotFound';
import { HomePage } from './Pages/HomePage';

export const App = () => {
  return (
    <div data-cy="app">
      <NavBar />

      <main className="section">
        <div className="container">
          <Routes>
            <Route
              path="*"
              element={<PageNotFound />}
            />
            <Route path="home" element={<Navigate to="/" replace />} />
            <Route path="/" element={<HomePage />} />
            <Route path="people">
              <Route
                index
                element={<PeoplePage />}
              />
              <Route
                path=":slug"
                element={<PeoplePage />}
              />
            </Route>
          </Routes>
        </div>
      </main>
    </div>
  );
};
