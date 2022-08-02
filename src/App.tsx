import React from 'react';

import './App.scss';
import { Route, Routes } from 'react-router-dom';
import { PeopleTable } from './components/PeopleTable';
import 'bulma';
import { Header } from './components/Header';
import { HomePage } from './components/HomePage';
import { Error } from './components/Error';

const App: React.FC = () => {
  return (
    <div className="App">
      <Header />

      <Routes>
        <Route path="/" element={(<HomePage />)} />
        <Route path="/people" element={(<PeopleTable />)} />
        <Route path="*" element={(<Error />)} />
      </Routes>
    </div>
  );
};

export default App;
