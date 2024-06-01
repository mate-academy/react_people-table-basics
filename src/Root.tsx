import { Routes, Route, Navigate } from 'react-router-dom';
import { HomePage, Page404, PeoplePage } from './pages';
import { App } from './App';

export const Root = () => {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path="home" element={<Navigate to="/" replace />} />
        <Route path="people/:person?" element={<PeoplePage />} />
        <Route path="*" element={<Page404 />} />
      </Route>
    </Routes>
  );
};
