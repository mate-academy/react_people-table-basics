import './App.scss';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Home } from './components/Home/Home';
import { PeoplePage } from './components/PeoplePage/PeoplePage';
import { NotFoundPage } from './components/NotFoundPage/NotFoundPage';
import { Header } from './components/Header/Header';

const App = () => (
  <div className="App">
    <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/people" element={<PeoplePage />} />
      <Route path="*" element={<NotFoundPage />} />
      <Route path="/home" element={<Navigate to="/" replace />} />
    </Routes>
  </div>
);

export default App;
