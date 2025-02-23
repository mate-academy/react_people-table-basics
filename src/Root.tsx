import { HashRouter, Route, Routes, Navigate } from 'react-router-dom';
import { App } from './App';
import HomePage from './pages/HomePage';
import PeoplePage from './pages/PeoplePage';
import PageNotFound from './pages/PageNotFound';

export const Root = () => (
  <HashRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path="/home" element={<Navigate to=".." replace={true} />} />
        <Route path="people/:slug?" element={<PeoplePage />} />
        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  </HashRouter>
);
