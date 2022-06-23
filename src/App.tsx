import './App.scss';
// import React from 'react';
import {
  Routes, Route, Link, Navigate,
} from 'react-router-dom';
import { PeopleTable } from './components/PeopleTable/PeopleTable';

const App = () => {
  return (
    <div className="App">
      <h1>People table</h1>
      <header>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/people">People</Link>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<h1>Home page</h1>} />
        <Route path="people" element={<PeopleTable />} />
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="*" element={<p>Page not found</p>} />
      </Routes>
    </div>
  );
};

export default App;
