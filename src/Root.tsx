import { HashRouter, Route, Routes } from 'react-router-dom';
import { App } from './App';
import { People } from './components/PeoplePage';

export const Root = () => (
  <HashRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<h1 className="title">Home Page</h1>} />
        <Route path="people">
          <Route index element={<People />} />
          <Route path=":personSlug" element={<People />} />
        </Route>
      </Route>
    </Routes>
  </HashRouter>
);
