import { memo } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.scss';
import Header from './layouts';
import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { PeoplePage } from './pages/PeoplePage';

const App = memo(() => (
  <div className="App">
    <Header />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="people" element={<PeoplePage />} />
      <Route
        path="home"
        element={<Navigate to="/" replace />}
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </div>
));

export default App;
