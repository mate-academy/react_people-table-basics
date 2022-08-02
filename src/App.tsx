import { Routes, Route, Navigate } from 'react-router-dom';
import './App.scss';
import 'bulma/css/bulma.min.css';

import { Header } from './Components/Header';
import { PeopleTable } from './Components/PeopleTable';
import { HomePage } from './Components/HomePage';
import { Page404 } from './Components/Page404';

export const App: React.FC = () => {
  return (
    <div className="App">
      <div className="container is-max-desktop">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route
            path="people"
            element={(
              <div>
                <h1 className="title has-text-centered notification is-primary">
                  People Table
                </h1>
                <PeopleTable />
              </div>
            )}
          />

          <Route path="*" element={<Page404 />} />
          <Route path="/home" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </div>
  );
};
