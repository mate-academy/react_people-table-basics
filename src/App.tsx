import './App.scss';
import { Route, Routes, Navigate } from 'react-router-dom';
import { HomePage } from './components/HomePage/HomePage';
import { PeoplePage } from './components/PeoplePage/PeoplePage';
import { NotFoundPage } from './components/NotFoundPage/NotFoundPage';
import { Header } from './components/Header/Header';

const App: React.FC = () => (
  <div className="App">
    <Header />

    <Routes>
      <Route path="/home" element={<Navigate to="/" />} />

      <Route path="/" element={<HomePage />} />

      <Route path="/people" element={<PeoplePage />} />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </div>
);

export default App;
