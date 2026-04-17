import { Navigate, Route, Routes } from 'react-router-dom';
import { App } from './App';
import { HomePage } from './components/HomePage/HomePage';
import { PageNotFound } from './components/PageNotFound/PageNotFound';
import { PeoplePage } from './components/PeoplePage/PeoplePage';

export const Root = () => {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path="home" element={<Navigate to="/" replace />} />

        <Route path="people" element={<PeoplePage />} />
        <Route path="people/:slug" element={<PeoplePage />} />

        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  );
};
