import './App.scss';
import { Navigate, Route, Routes } from 'react-router-dom';
import { NavPage } from './components/NavPage';
import { TabPage } from './components/TabPage';

export const App = () => (
  <div data-cy="app">
    <NavPage />

    <main className="section">
      <div className="container">
        <Routes>
          <Route
            path="/"
            element={<h1 className="title">Home Page</h1>}
          ></Route>
          <Route path="/home" element={<Navigate to={'/'} />}></Route>
          <Route path="people">
            <Route index element={<TabPage />} />
            <Route path=":slug" element={<TabPage />} />
          </Route>
          <Route path="*" element={<h1 className="title">Page not found</h1>} />
        </Routes>
      </div>
    </main>
  </div>
);
