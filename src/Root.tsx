import {
  HashRouter, Route, Routes, Navigate,
} from 'react-router-dom';
import { App } from './App';
import { Home } from './components/Home';
import { PeoplePage } from './Pages/PeoplePage';
import { NotFound } from './components/NotFound';

export const Root = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="home" element={<Navigate to="/" />} />
          <Route path="people">
            <Route index element={<PeoplePage />} />
            <Route path=":personId?" element={<PeoplePage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </HashRouter>
  );
};
