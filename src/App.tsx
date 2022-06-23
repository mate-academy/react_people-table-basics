import './App.scss';
import { Navigate, Routes, Route } from 'react-router-dom';
import { NotFoundPage } from './components/NotFoundPage';
import { HomePage } from './components/HomePage';
import { PeoplePage } from './components/PeoplePage';
import { Header } from './components/Header';

const App: React.FC = () => {
  return (
    <div className="App pt-6">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/people" element={<PeoplePage />} />
        <Route path="/home" element={<Navigate to="/" />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
};

export default App;
