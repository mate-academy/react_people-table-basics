import './App.scss';
import { Navigate, Route, Routes } from 'react-router-dom';
import { PeoplePage } from './pages/PeoplePage/PeoplePage';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';
import { HomePage } from './pages/HomePage/HomePage';
import { NavBar } from './components/NavBar';

export const App = () => {
  return (
    (
      <div data-cy="app">
        <NavBar />

        <main className="section">
          <div className="container">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="people">
                <Route index element={<PeoplePage />} />
                <Route path=":slug" element={<PeoplePage />} />
              </Route>
              <Route path="*" element={<NotFoundPage />} />
              <Route path="home" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </main>
      </div>
    )
  );
};
