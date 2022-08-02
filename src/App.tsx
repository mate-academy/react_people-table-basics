import './App.scss';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { HomePage } from './components/HomePage/HomePage';
import { PeoplePage } from './components/PeoplePage/PeoplePage';
import { NotFoundPage } from './components/NotFoundPage/NotFoundPage';

const App: React.FC = () => (
  <div className="App">
    <Header />

    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route
        path="/home"
        element={
          <Navigate to="/" replace />
        }
      />
      <Route path="/people" element={<PeoplePage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </div>
);

export default App;
