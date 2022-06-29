import { Route, Routes, Navigate } from 'react-router-dom';
import { Header } from './components/Header';
import { HomePage } from './components/HomePage';
import { PeoplePage } from './components/PeoplePage';
import { PageNotFound } from './components/PageNotFound';
import './App.scss';

const App = () => {
  return (
    <div>
      <Header />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/people" element={<PeoplePage />} />
        <Route path="*" element={<PageNotFound />} />
        <Route path="/home" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
};

export default App;
