import { Navigate, Route, Routes } from 'react-router-dom';
import { Home, People, NotFound } from '../pages';

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Navigate to="/" replace />} />

      <Route path="/people">
        <Route path=":slug?" element={<People />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
