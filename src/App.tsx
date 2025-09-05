import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';
import { Routes, Route, Navigate } from 'react-router-dom';
import { NavigationPage } from './Pages/NavigationPage';
import { HomePage } from './Pages/HomePage';
import { PeoplePage } from './Pages/PeoplePage';
import { NotFoundPage } from './Pages/NotFoundPage';

export const App = () => {
  return (
    <>
      <NavigationPage />
      <div data-cy="app">
        <main className="section">
          <div className="container">
            <Routes>
              <Route path="/home" element={<Navigate to="/" replace />} />

              <Route path="/" element={<HomePage />} />
              <Route path="people">
                <Route index element={<PeoplePage />} />
                <Route path=":slug" element={<PeoplePage />} />
              </Route>

              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
        </main>
      </div>
    </>
  );
};
