import { Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/0_Layout/Layout';
import { HomePage } from './components/pages/0_HomePage/HomePage';
import { PeoplePage } from './components/pages/3_PeoplePage/PeoplePage';
import './App.scss';

export const App = () => (
  <div className="App">
    App
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="people" element={<PeoplePage />} />
        <Route path="/home" element={<Navigate to="/" />} />
        <Route path="*" element={<p>Page not found</p>} />
      </Route>
    </Routes>
  </div>
);
