import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.scss';
import 'bulma';
import { Header } from './components/Header';
import { PeoplePage } from './components/PeoplePage';

const App: React.FC = () => (
  <div className="App">
    <div className="container">

      <Header />

      <Routes>
        <Route
          path="/"
          element={(
            <h1 className="title">Home page</h1>
          )}
        />
        <Route
          path="people"
          element={<PeoplePage />}
        />
        <Route
          path="*"
          element={(
            <h1 className="title">Page not found</h1>
          )}
        />
      </Routes>
    </div>
  </div>
);

export default App;
