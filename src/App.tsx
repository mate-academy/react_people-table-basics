import { Route, Routes, Navigate } from 'react-router-dom';
import { Header } from './Components/Header';
import { HomePage } from './Components/HomePage';
import { NotFoundPage } from './Components/NotFoundPage';
import { PeoplePage } from './Components/PeoplePage';
import './App.scss';

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
