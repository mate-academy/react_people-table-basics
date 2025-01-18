import { NavigationPanel } from './components/NavigationPanel/NavigationPanel';
import { Routes, Route, Navigate } from 'react-router-dom';

import './App.scss';
import { Container } from './components/Container/Container';
import { PeopleTable } from './components/PeopleTable/PeopleTable';

export const App = () => (
  <div data-cy="app">
    <NavigationPanel />

    <Routes>
      <Route path="/" element={<Container />}>
        <Route index element={<h1 className="title">Home Page</h1>} />
        <Route path="people">
          <Route index element={<PeopleTable />} />
          <Route path=":personData" element={<PeopleTable />} />
        </Route>
        <Route path="home" element={<Navigate to="/" replace />} />
        <Route path="*" element={<h1 className="title">Page not found</h1>} />
      </Route>
    </Routes>

    <main className="section">
      <div className="container"></div>
    </main>
  </div>
);
