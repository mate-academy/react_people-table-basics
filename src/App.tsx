import './App.scss';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/Header';
import { HomePage } from './components/HomePage';
import { PeoplePage } from './components/PeoplePage';
import { NotFoundPage } from './components/NotFoundPage';

const App = () => (
  <div className="App container">
    <Header />

    <Routes>
      <Route
        path="/home"
        element={
          <Navigate to="/" replace />
        }
      />
      <Route
        path=""
        element={<HomePage />}
      />
      <Route
        path="people"
        element={<PeoplePage />}
      />
      <Route
        path="*"
        element={<NotFoundPage />}
      />
    </Routes>
  </div>
);

export default App;
