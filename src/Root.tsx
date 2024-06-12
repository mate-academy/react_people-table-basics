import { HashRouter, Route, Routes } from 'react-router-dom';
import { App } from './App';
import { HomePage } from './pages/HomePage';
import { PeoplePage } from './pages/PeoplePage';
import { PeopleProvider } from './store/PeopleContext';

export const Root = () => (
  <HashRouter>
    <PeopleProvider>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="people" element={<PeoplePage />} />
          <Route path="people/:tabId" element={<PeoplePage />} />
          <Route path="*" element={<h1 className="title">Page not found</h1>} />
        </Route>
      </Routes>
    </PeopleProvider>
  </HashRouter>
);
