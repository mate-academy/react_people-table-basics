import { Navigate, Route, Routes } from 'react-router-dom';

import './App.scss';
import { HomePage } from './components/AppCompontens/HomePage';
import { Navigation } from './components/AppCompontens/NavigationBlock';
import { WrongPage } from './components/AppCompontens/WrongPage';
import { PeopleTable } from './components/AppCompontens/PeopleTable';

export const App = () => (
  <div data-cy="app">
    <Navigation />

    <main className="section">
      <div className="container">

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<Navigate to="/" />} />
          <Route path="*" element={<WrongPage />} />

          <Route path="/people">
            <Route index element={<PeopleTable />} />
            <Route path=":slug" element={<PeopleTable />} />
          </Route>
        </Routes>
      </div>
    </main>
  </div>
);
