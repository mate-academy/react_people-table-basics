import './App.scss';
import { NavBar } from './components/NavBar';
import { Route, Routes, Navigate } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { PeoplePage } from './pages/PeoplePage';
import { NotFoundPage } from './pages/NotFoundPage';

export const App = () => {
  return (
    <div data-cy="app">
      <NavBar />

      <main className="section">
        <div className="container">
          <Routes>
            <Route path='/' element={<HomePage />}></Route>
            <Route path='/home' element={<Navigate to='/' replace />}></Route>
            <Route path='/people'>
              <Route index element={<PeoplePage />}></Route>
              <Route path=':slug' element={<PeoplePage />}></Route>
            </Route>
            <Route path='*' element={<NotFoundPage />}></Route>
          </Routes>
        </div>
      </main>
    </div>
  );
};
