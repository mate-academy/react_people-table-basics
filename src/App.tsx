import { Navigate, Route, Routes } from 'react-router-dom';
import './App.scss';
import { NavBar } from './components/NavBar';
import { PersonsPage } from './components/Pages/PersonsPage';
import { HomePage } from './components/Pages/HomePage';
import { PageNotFound } from './components/Pages/PageNotFound';

export const App = () => {
  return (
    <div data-cy="app">
      <NavBar />

      <main className="section">
        <div className="container">
          <Routes>
            <Route path="people" element={<PersonsPage />}>
              <Route index element={<PersonsPage />} />
              <Route path=":slug" element={<PersonsPage />} />
            </Route>
            <Route path="/" element={<HomePage />} />
            <Route path="home" element={<Navigate to="/" replace />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};
