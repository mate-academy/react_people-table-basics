import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { App } from './App';
import { HomePage } from './components/HomePage';
import { PeoplePage } from './components/PeoplePage';

export const Root = () => (
  <HashRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />}></Route>
        <Route path="home" element={<Navigate to="/" replace />} />

        <Route path="people">
          <Route index element={<PeoplePage />}></Route>
          <Route path=":slug" element={<PeoplePage />}></Route>
        </Route>

        <Route
          path="*"
          element={<h1 className="title">Page not found</h1>}
        ></Route>
      </Route>
    </Routes>
  </HashRouter>
);
