import { Navigate, Route, Routes } from 'react-router-dom';
import { HomePage } from '../pages/PageNotFound';
import { PeoplePage } from '../pages/PeoplePage';
import { PageNotFound } from '../pages/HomePage';
import { App } from '../App';

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path="home" element={<Navigate to="/" replace={true} />} />
        <Route path="people">
          <Route index element={<PeoplePage />} />
          <Route path=":slug" element={<PeoplePage />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  );
};
