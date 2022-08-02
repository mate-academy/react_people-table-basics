import './App.scss';
import { Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import Navigation from './components/Navigation/Navigation';
import NotFoundPage from './components/NotFoundPage/NotFoundPage';
import PeoplePage from './components/PeoplePage/PeoplePage';

const App = () => (
  <div className="App">
    <Navigation />
    <Routes>
      <Route path="/" element={<Navigate replace to="/home" />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/people" element={<PeoplePage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </div>
);

export default App;
