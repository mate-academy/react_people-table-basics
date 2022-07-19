import { Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/1_Header/Header';
import { HomePage } from './components/0_HomePage/HomePage';
import { PeoplePage } from './components/3_PeoplePage/PeoplePage';
import './App.scss';

export const App = () => (
  <div className="App">
    <Header />

    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="people" element={<PeoplePage />} />
      <Route path="*" element={<p>Page not found</p>} />
      <Route path="/home" element={<Navigate to="/" />} />
    </Routes>
  </div>
);
