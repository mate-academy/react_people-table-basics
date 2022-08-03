import './App.scss';
import React from 'react';
import {
  Route, Routes, Navigate,
} from 'react-router-dom';
import 'bulma/css/bulma.css';
import { PeoplePage } from './elements/PeoplePage';
import { NotFoundPage } from './elements/NotFoundPage';
import { Header } from './elements/Header';

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>People table</h1>
      <Header />

      <Routes>
        <Route
          path="/"
          element={<p className="some-title">Home Page</p>}
        />
        <Route
          path="people"
          element={(
            <>
              <p className="some-title">People List</p>
              <PeoplePage />
            </>
          )}
        />
        <Route
          path="home"
          element={<Navigate to="/" />}
        />
        <Route
          path="*"
          element={<NotFoundPage />}
        />
      </Routes>
    </div>
  );
};

export default App;
