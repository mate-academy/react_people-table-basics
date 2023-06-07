import { Navigate, Route, Routes } from 'react-router-dom';
import { PeopleList } from './components/PageList/PeopleList';
import './App.scss';
import { NavBar } from './components/NavBar';
import { HomePage } from './components/HomePage';
import { PageNotFound } from './components/PageNotFound';

export const App = () => (
  <div data-cy="app">
    <NavBar />

    <main className="section">
      <div className="container">
        <Routes>
          <Route path="people">
            <Route index element={<PeopleList />} />
            <Route path=":slug" element={<PeopleList />} />
          </Route>
          <Route path="/" element={<HomePage />} />
          <Route path="home" element={<Navigate to="/" replace />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </main>
  </div>
);
