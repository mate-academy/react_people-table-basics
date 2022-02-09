import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { MainNaviganion } from './components/MainNaviganion';
import { HomePage } from './pages/HomePage';
import { PeoplePage } from './pages/PeoplePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { PeopleProvider } from './PeopleContext';

import './App.scss';

const App: React.FC = () => {
  return (
    <PeopleProvider>
      <div className="App">
        <MainNaviganion />

        <section className="section">
          <div className="container">
            <h1 className="title">Main title</h1>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/people" element={<PeoplePage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
        </section>
      </div>
    </PeopleProvider>
  );
};

export default App;
