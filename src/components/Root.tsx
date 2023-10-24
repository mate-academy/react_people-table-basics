import {
  HashRouter, Navigate, Route, Routes,
} from 'react-router-dom';
import { HomePage } from './HomePage';
import { App } from '../App';
import { PeoplePage } from './PeoplePage';

export const Root = () => {
  return (
    <HashRouter>
      <Routes>
        <Route element={<App />}>
          <Route path="/" index element={<HomePage />} />
          <Route path="home" element={<Navigate to="/" replace />} />
          <Route path="*" element={<h1 className="title">Page not found</h1>} />
          <Route path="/people" element={<PeoplePage />}>
            <Route path=":slug?" element={<PeoplePage />} />
          </Route>
        </Route>
      </Routes>
    </HashRouter>
  );
};
