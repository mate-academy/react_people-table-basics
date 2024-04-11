import { Navigate, Route, Routes } from 'react-router-dom';
import { HomePage } from '../../Pages/HomePage';
import { PeoplePage } from '../../Pages/PeoplePage';
import { PageNotFound } from '../../Pages/PageNotFound';
import { App } from '../../App';

export const Root = () => (
  <Routes>
    <Route path="/" element={<App />}>
      <Route index element={<HomePage />} />
      <Route path="home" element={<Navigate to="../" replace />} />
      <Route path="people">
        <Route path=":slug?" element={<PeoplePage />} />
      </Route>

      <Route path="*" element={<PageNotFound />} />
    </Route>
  </Routes>
);
