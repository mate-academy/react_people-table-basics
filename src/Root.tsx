import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Home } from './components/Home';
import { PageNotFound } from './components/PageNotFound';
import { App } from './App';
import { People } from './components/People';

export const Root = () => (
  <HashRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="people" element={<People />}>
          <Route path=":slug" element={<People />} />
        </Route>

        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  </HashRouter>
);
