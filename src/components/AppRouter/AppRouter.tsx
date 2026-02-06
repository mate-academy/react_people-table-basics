import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Navigation } from '../Navigation/Navigation';
import { HomePage } from '../HomePage/HomePage';
import { PeoplePage } from '../PeoplePage/PeoplePage';
import { PageNotFound } from '../PageNotFound/PageNotFound';

export const AppRouter = () => {
  return (
    <HashRouter>
      <Navigation />

      <main className="section">
        <div className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route path="/people" element={<PeoplePage />} />
            <Route path="/people/:slug" element={<PeoplePage />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </div>
      </main>
    </HashRouter>
  );
};
