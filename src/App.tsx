/* eslint-disable import/order */
import { Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { HomePage } from './components/HomePage';
import { PeoplePage } from './components/PeoplePage';
import { NotFoundPage } from './components/NotFoundPage';

import './App.scss';

const App = () => (
  <div className="App">
    <Header />

    <Routes>
      <Route path="/" element={<HomePage />} />

      <Route path="/people" element={<PeoplePage />} />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </div>
);

export default App;
