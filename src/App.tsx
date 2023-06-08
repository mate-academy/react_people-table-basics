import './App.scss';
import {
  Navigate, Route, Routes,
} from 'react-router-dom';
import { PeoplePage } from './components/pages/PeoplePage';
import { MainNav } from './components/MainNav';

export const App = () => {
  return (
    <div data-cy="app">
      <MainNav />

      <main className="section">
        <div className="container">
          <Routes>
            <Route path="people">
              <Route index element={<PeoplePage />} />
              <Route path=":slug" element={<PeoplePage />} />
            </Route>

            <Route index element={<h1 className="title">Home Page</h1>} />
            <Route path="home" element={<Navigate to="/" replace />} />
            <Route path="*" element={<p>Page not found</p>} />
          </Routes>
        </div>
      </main>
    </div>
  );
};
