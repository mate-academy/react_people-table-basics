import { Route, Navigate, Routes } from 'react-router-dom';
import { Navigation } from './components/Navigation/Navigation';
import './App.scss';
import { HomePage } from './components/HomePage/HomePage';
import { PeoplePage } from './components/PeoplePage/PeoplePage';
import { NotFoundPage } from './components/NotFoundPage/NotFoundPage';

const App = () => (
  <div className="App">
    <Navigation />

    <Routes>
      <Route path="/home" element={<Navigate to="/" />} />
      <Route path="/people" element={<PeoplePage />} />
      <Route path="/" element={<HomePage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </div>
);

export default App;
