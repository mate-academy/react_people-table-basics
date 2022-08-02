import './App.scss';
import {
  HashRouter, Routes, Route, Navigate,
} from 'react-router-dom';
import { MainNavigation } from './components/MainNavigation';
import { HomePage } from './components/HomePage';
import { PeoplePage } from './components/PeoplePage';
import { NotFoundPage } from './components/NotFoundPage';

const App = () => (
  <HashRouter>
    <MainNavigation />
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/people" element={<PeoplePage />} />
        <Route path="/home" element={<Navigate to="/" />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  </HashRouter>
);

export default App;
