import './App.scss';
import { Route, Routes, Navigate } from 'react-router-dom';
import { PeoplePage } from './PeoplePage';
import { HomePage } from './HomePage';
import { NotFoundPage } from './NotFoundPage';
import { Header } from './Header';

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<Navigate replace to="/" />} />
        <Route path="/people" element={<PeoplePage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
};

export default App;
