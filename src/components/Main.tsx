import { HomePage } from './HomePage';
import { Navigate, Route, Routes } from 'react-router-dom';
import { PeoplePage } from './PeoplePage';

export const Main = () => {
  return (
    <main className="section">
      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<Navigate to="/" />} />
          <Route path="/people/:slug?" element={<PeoplePage />} />

          <Route path="*" element={<h1 className="title">Page not found</h1>} />
        </Routes>
      </div>
    </main>
  );
};
