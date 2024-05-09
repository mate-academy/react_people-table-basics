import { FC } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { App } from './App';
import { HomePage, PageNotFound, PeoplePage } from './pages';

const Root: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="/people">
          <Route index element={<PeoplePage />} />
          <Route path=":slug" element={<PeoplePage />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  );
};

export default Root;
