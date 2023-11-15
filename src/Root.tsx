import {
  HashRouter, Navigate, Route, Routes,
} from 'react-router-dom';
import { App } from './App';
import { Home } from './components/Home';
import { PeopleTable } from './components/PeopleTable';

export const Root = () => (
  <HashRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route
          path="*"
          element={<h1 className="title">Page not found</h1>}
        />

        <Route index element={<Home />} />
        <Route path="/home" element={<Navigate to="/" />} />

        <Route path="people">
          <Route index element={<PeopleTable />} />
          <Route path=":person?" element={<PeopleTable />} />
        </Route>
      </Route>
    </Routes>
  </HashRouter>
);
