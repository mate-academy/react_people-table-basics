import 'bulma/css/bulma.css';
import './App.scss';

import { Route, Routes, Navigate } from 'react-router-dom';
import { HomePage } from './components/HomePage';
import { PeoplePage } from './components/PeoplePage';
import { NotFoundPage } from './components/NotFoundPage';
import { Header } from './components/Header';

const App = () => (
  <div className="App">
    <Header />

    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/people" element={<PeoplePage />} />
      <Route path="/home" element={<Navigate to="/" />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </div>
);

export default App;
