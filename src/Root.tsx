import { HashRouter, Route, Routes, Navigate } from 'react-router-dom';
import { App } from './App';
import { HomePage } from './components/HomePage/HomePage';
import { PeoplePage } from './components/PeoplePage/PeoplePage';
import { NotFoundPage } from './components/NotFoundPage/NotFoundPage';
import { WAYS } from './utils/ways';

export const Root = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path={WAYS.HOME} element={<App />}>
          <Route index element={<HomePage />} />
          <Route path={`${WAYS.PEOPLE}/:slug?`} element={<PeoplePage />} />
          <Route path="home" element={<Navigate to={WAYS.HOME} replace />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </HashRouter>
  );
};
