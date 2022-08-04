import './App.scss';
import {
  Routes, Route, Navigate,
} from 'react-router-dom';
import { PeoplePage } from './PeoplePage';
import { NotFoundPage } from './NotFoundPage';
import { Home } from './Home';
import { Header } from './Header';

export const App = () => (
  <>
    <Header />

    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/home"
          element={<Navigate to="/" replace />}
        />
        <Route path="/people" element={<PeoplePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  </>
);
