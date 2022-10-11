import {
  Route, Routes, Navigate,
} from 'react-router-dom';
import './App.scss';
import { PeoplePage } from './Pages.tsx';
import { MainNav } from './components/MainNav';

export const App = () => (
  <div data-cy="app">
    <MainNav />

    <main className="section">
      <div className="container">
        <Routes>
          <Route path="*" element={<h1 className="title">Page not found</h1>} />
          <Route path="home" element={<Navigate to="/" replace />} />
          <Route path="/" element={<h1 className="title">Home page</h1>} />
          <Route path="people">
            <Route index element={<PeoplePage />} />
            <Route path=":slug" element={<PeoplePage />} />
          </Route>
        </Routes>
      </div>
    </main>
  </div>
);
