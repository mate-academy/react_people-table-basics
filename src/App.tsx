import './App.scss';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Header } from './components/Header';
import { HomePage } from './components/HomePage';
import { People } from './components/PeoplePage';
import { NotFoundPage } from './components/NotFoundPage';

const App = () => (
  <div className="container">
    <Header />

    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/people" element={<People />} />
      <Route path="*" element={<NotFoundPage />} />
      <Route path="/home" element={<Navigate to="/" />} />
    </Routes>
  </div>
);

export default App;
