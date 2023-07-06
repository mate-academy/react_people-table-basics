import './App.scss';
import { Navigate, Route, Routes } from 'react-router-dom';
import { HomePage } from './components/pages/PeoplePage/HomePage';
import { PeoplePage } from './components/pages/PeoplePage/PeoplePage';
import { NotFoundPage } from './components/pages/PeoplePage/NotFoundPage';
import { Header } from './components/Header/Header';

export const App = () => {
  return (
    <div data-cy="app">
      <Header />

      <main className="section">
        <div className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="home" element={<Navigate to="/" replace />} />
            <Route path="*" element={<NotFoundPage />} />

            <Route path="people" element={<PeoplePage />}>
              <Route path=":slug" element={<PeoplePage />} />
            </Route>

          </Routes>
        </div>
      </main>
    </div>
  );
};
