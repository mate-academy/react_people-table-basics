import { Navigate, Route, Routes } from 'react-router-dom';
import './App.scss';
import { PeoplePage } from './components/PeoplePage/PeoplePage';
import { HomePage } from './components/HomePage/HomePage';
import { NotFoundPage } from './components/NotFoundPage/NotFoundPage';
import { Navbar } from './components/Navbar/Navbar';

export const App = () => {
  return (
    <div data-cy="app">
      <Navbar />

      <main className="section">
        <div className="container">
          <Routes>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/people">
              <Route index element={<PeoplePage />}></Route>
              <Route path=":newId" element={<PeoplePage />}></Route>
            </Route>
            <Route path="/home" element={<Navigate to={'/'} replace />}></Route>
            <Route path="*" element={<NotFoundPage />}></Route>
          </Routes>
        </div>
      </main>
    </div>
  );
};
