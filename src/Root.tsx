import { Navigate, Route, Routes } from 'react-router-dom';
import { App } from './App';
import { Home } from './page/Home';
import { PeoplePage } from './page/PeoplePage';
import { NotFoundPage } from './page/NotFoundPage';

export const Root = () => (
  <Routes>
    <Route path="/" element={<App />}>
      <Route index element={<Home />} />
      <Route path="/home" element={<Navigate to="/" replace={true} />} />
      <Route path="people">
        <Route path=":personSlug?" element={<PeoplePage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  </Routes>
);
