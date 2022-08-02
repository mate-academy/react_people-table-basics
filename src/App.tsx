import { Navigate, Route, Routes } from 'react-router-dom';
import './App.scss';
import { Header } from './components/Header/Header';
import { HomePage } from './components/HomePage/HomePage';
import { NotFoundPage } from './components/NotFoundPage/NotFoundPage';
import { PeoplePage } from './components/PeoplePage/PeoplePage';

const App = () => (
  <div className="app container is-max-desktop">
    <h1 className="app__title">People table</h1>
    <Header />
    <Routes>
      <Route path="/" element={(<HomePage />)} />
      <Route path="/people" element={(<PeoplePage />)} />
      <Route path="/home" element={<Navigate to="/" />} />
      <Route path="*" element={(<NotFoundPage />)} />
    </Routes>
  </div>
);

export default App;
