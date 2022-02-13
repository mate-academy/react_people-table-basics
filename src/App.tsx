import { FC } from 'react';
import {
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import './App.scss';
import { Header } from './components/Header';
import { HomePage } from './components/HomePage';
import { NotFoundPage } from './components/NotFoundPage';
import { PeoplePage } from './components/PeoplePage';
import { PeopleTable } from './components/PeopleTable';

const App: FC = () => (
  <div className="App">
    <Header />

    <Routes>
      <Route
        path="/"
        element={<HomePage />}
      />

      <Route
        path="/people"
        element={<PeoplePage />}
      >
        <Route path="" element={<PeopleTable />} />
      </Route>

      <Route
        path="/home"
        element={<Navigate to="/" replace />}
      />

      <Route
        path="*"
        element={<NotFoundPage />}
      />
    </Routes>
  </div>
);

export default App;
