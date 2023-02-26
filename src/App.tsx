// import { Loader } from './components/Loader';
import './App.scss';
import { HomePage } from './components/HomePage';
import { PeoplePage } from './components/PeoplePage';
import { Navigate, Routes, Route } from "react-router-dom";
import { NotFoundPage } from './components/NotFoundPage';
import { Navigation } from './components/Navigation';

export const App = () => (

  <div data-cy="app">
    <Navigation />
    <main className="section">
      <div className="container">
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route
            path='/people'
            element={<PeoplePage />}
          />
          <Route
            path='/home'
            element={<Navigate to='/' replace/>}
          />
          <Route
            path='*'
            element={<NotFoundPage />}
          />
          <Route
            path=':slug'
            element={<PeoplePage />}
          />
        </Routes>
      </div>
    </main>
  </div>
);
