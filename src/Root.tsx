import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { App } from './App';
import { People } from './pages/People';
import { Home } from './pages/Home';
import { NotFound } from './pages/NotFound';

export const Root = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="home" element={<Navigate to=".." replace />} />

          <Route path="people">
            <Route path=":slug?" element={<People />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </HashRouter>
  );
};
