import React from 'react';
import './App.scss';
import 'bulma';
import { Link, Route, Routes } from 'react-router-dom';
import { PeopleTable } from './components/PeopleTable';
import { HomePage } from './components/HomePage';
import { NotFoundPage } from './components/NotFoundPage';

const App: React.FC = () => {
  return (
    <div className="App">
      <nav className="navbar">
        <Link className="navbar-item" to="/">
          Home
        </Link>

        <Link className="navbar-item" to="/people">
          People
        </Link>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/people" element={<PeopleTable />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
};

export default App;
