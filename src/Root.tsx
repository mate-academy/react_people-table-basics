import {
  HashRouter, Navigate, Route, Routes,
} from 'react-router-dom';
import { App } from './App';
import { HomePage } from './components/HomePage';
import { PeopleList } from './components/PeopleList';
import { PageNotFound } from './components/PageNotFound/PageNotFound';

export const Root = () => (
  <HashRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path="people" element={<PeopleList />}>
          <Route path="/people/:slug?" element={<PeopleList />} />
        </Route>
      </Route>
      <Route path="*" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path="*" element={<PageNotFound />} />
      </Route>
      <Route path="home" element={<Navigate to=".." />} />
    </Routes>
  </HashRouter>
);
