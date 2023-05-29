import { Navigate, Route, Routes } from 'react-router-dom';
import { PeoplePage } from './Pages';
import './App.scss';
import { Navigation } from './components/MainNav';
import { HomePage } from './Pages/HomePage';
import { NotFoundPage } from './Pages/NotFoundPage';

export const App = () => {
  return (
    <div data-cy="app">
      <Navigation />

      <main className="section">
        <div className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route path="*" element={<NotFoundPage />} />

            <Route path="/people">
              <Route
                index
                element={<PeoplePage />}
              />
              <Route path=":slug" element={<PeoplePage />} />
            </Route>
          </Routes>

        </div>
      </main>
    </div>
  );
};
