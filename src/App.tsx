import { Navigate, Route, Routes } from 'react-router-dom';
import './App.scss';
import { HomePage } from './components/HomePage/HomePage';
import { NavBar } from './components/NavBar/NavBar';
import { PageNotFound } from './components/PageNotFound/PageNotFound';
import { PeoplePage } from './components/PeoplePage/PeoplePage';

export const App = () => (
  <div data-cy="app">
    <NavBar />

    <main className="section">
      <div className="container">

        <Routes>
          <Route path="*" element={<PageNotFound />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="people">
            <Route index element={<PeoplePage />} />
            <Route path=":slug" element={<PeoplePage />} />
          </Route>
        </Routes>

      </div>
    </main>
  </div>
);
