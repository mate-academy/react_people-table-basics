import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { App } from '../src/App';
import { People } from '../src/components/People';
import { Home } from '../src/components/Home';

export const Root = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="people">
            <Route index element={<People />} />
            <Route path=":slug" element={<People />} />
          </Route>
          <Route path="*" element={<h1 className="title">Page not found</h1>} />
          <Route path="home" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </HashRouter>
  );
};
