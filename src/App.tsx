import './App.scss';
import { Navigate, Route, Routes } from 'react-router-dom';

import { People } from './components/People';
import { NavBar } from './components/Navbar';

export const App = () => (
  <div data-cy="app">
    <NavBar />
    <main className="section">
      <div className="container">
        <Routes>
          <Route path="/">
            <Route index element={<h1 className="title">Home Page</h1>} />
            <Route path="home" element={<Navigate to={'/'} replace />} />
            <Route path="people">
              <Route index element={<People />} />
              <Route path=":slug" element={<People />} />
            </Route>
          </Route>
          <Route path="*" element={<h1 className="title">Page not found</h1>} />
        </Routes>
      </div>
    </main>
  </div>
);
