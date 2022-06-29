import './App.scss';
import { Navigate, Route, Routes } from 'react-router-dom';
import { HomePage } from './components/pageElement/HomePage';
import { PeoplePage } from './components/pageElement/PeoplePage';
import { NotFoundPage } from './components/pageElement/NotFoundPage';
import { Header } from './components/header/Header';

const App = () => (
  <div className="App">
    <Header />

    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/people" element={<PeoplePage />} />
      <Route path="/home" element={<Navigate to="/" />} />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>

  </div>
);

export default App;
