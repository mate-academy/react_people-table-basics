import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { App } from './App';
import { RoutesParts } from './types/RoutesURLParts';
import { HomePage } from './pages/HomePage';
import { PeoplePage } from './pages/PeoplePage';
import { UnknowPage } from './pages/UnknownPage';

export const Root = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path={RoutesParts.root} element={<App />}>
          <Route index element={<HomePage />} />
          <Route
            path={RoutesParts.home}
            element={<Navigate to={RoutesParts.root} replace />}
          />
          <Route path={RoutesParts.people}>
            <Route index element={<PeoplePage />} />
            <Route path={RoutesParts.personId} element={<PeoplePage />} />
          </Route>
          <Route path={RoutesParts.notFount} element={<UnknowPage />} />
        </Route>
      </Routes>
    </HashRouter>
  );
};
